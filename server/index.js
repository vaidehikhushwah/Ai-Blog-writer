import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

const postsFile = path.join(__dirname, "posts.json");

// Load posts from file
function loadPosts() {
  if (fs.existsSync(postsFile)) {
    return JSON.parse(fs.readFileSync(postsFile, "utf-8"));
  }
  return [];
}

// Save posts to file
function savePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

// GET all posts
app.get("/api/posts", (req, res) => {
  const posts = loadPosts();
  res.json(posts);
});

// POST create new post from text
app.post("/api/posts", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a blog writing assistant. Generate a JSON response with title, summary, sections (array of {heading, content}), and tags (array of strings).",
          },
          {
            role: "user",
            content: `Create a blog post from this text:\n\n${text}\n\nRespond with valid JSON only in this format: {"title": "...", "summary": "...", "sections": [{"heading": "...", "content": "..."}], "tags": ["..."]}
`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message });
    }

    const content = data.choices[0].message.content;
    const blogPost = JSON.parse(content);

    const post = {
      id: uuidv4(),
      ...blogPost,
      createdAt: new Date().toISOString(),
    };

    const posts = loadPosts();
    posts.push(post);
    savePosts(posts);

    res.json(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

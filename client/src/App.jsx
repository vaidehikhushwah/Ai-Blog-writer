import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>AI Blog Writer</h1>
      <CreatePost onCreated={handlePostCreated} />
      <div className="posts-list">
        <h2>Generated Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Create one to get started!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p className="summary">{post.summary}</p>
              <div className="sections">
                {post.sections && post.sections.map((section, idx) => (
                  <div key={idx} className="section">
                    <h4>{section.heading}</h4>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
              <div className="tags">
                {post.tags && post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

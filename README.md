# AI Blog Writer — Mini Project

A minimal AI blog-writer that generates blog posts (title, summary, sections, tags) from a transcript or text using the OpenAI API.

## Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Styling**: CSS
- **API**: OpenAI API

## Project Structure
```
ai-blog-writer/
├── server/
│   ├── package.json
│   ├── index.js
│   └── posts.json
├── client/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles.css
│       └── components/
│           └── CreatePost.jsx
├── .gitignore
├── LICENSE
└── README.md
```

## Installation

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

## Environment Variables
Create a `.env` file in the `server` directory:
```
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

## Running the Project

### Start Backend
```bash
cd server
npm start
```

### Start Frontend (in another terminal)
```bash
cd client
npm run dev
```

## Features
- Generate blog posts from text or transcripts
- AI-powered title, summary, and section generation
- Tag suggestions
- Simple and clean UI

## License
MIT License - See LICENSE file for details

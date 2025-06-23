# Streaming Website

A full-stack video streaming website that allows users to upload videos, which are then converted to HLS format for adaptive streaming. The backend is built with Node.js and Express, using FFmpeg for video processing. The frontend is a modern, responsive React app (with Vite) featuring a custom video player with advanced controls and HLS.js support for smooth playback in all browsers.

## Features

- Upload video files via a simple web interface
- Videos are automatically converted to HLS (.m3u8 + .ts segments) for adaptive streaming
- Responsive, modern React frontend
- Custom video player with play/pause, seek, volume, fullscreen, and buffering indicator
- HLS.js integration for cross-browser compatibility
- Progress bar and error handling during upload

## Tech Stack

- **Backend:** Node.js, Express, Multer, FFmpeg, UUID
- **Frontend:** React, Vite, HLS.js, CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [FFmpeg](https://ffmpeg.org/) (must be installed and available in your PATH)

### Backend Setup

1. Clone the repository and navigate to the project root:
   ```bash
   git clone <your-repo-url>
   cd Streaming Website
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on [http://localhost:8000](http://localhost:8000).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

## Usage

1. Open the frontend in your browser: [http://localhost:5173](http://localhost:5173)
2. Upload a video file using the provided form.
3. Wait for the upload and processing to complete. The video will appear in the custom player for streaming.

## Folder Structure

```
Streaming Website/
  ├── index.js           # Express backend
  ├── package.json       # Backend dependencies
  ├── uploads/           # Uploaded and processed videos (HLS)
  ├── frontend/          # React frontend (Vite)
      ├── src/
      ├── public/
      └── ...
```

## Credits

- [Express](https://expressjs.com/)
- [FFmpeg](https://ffmpeg.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [hls.js](https://github.com/video-dev/hls.js/)

---

Feel free to fork, contribute, or use this project as a starting point for your own streaming platform!

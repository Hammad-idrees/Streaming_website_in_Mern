import { useState, useRef } from "react";
import "./App.css";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonId, setLessonId] = useState("");
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a video file to upload.");
      return;
    }
    setUploading(true);
    setProgress(0);
    setError("");
    setVideoUrl("");
    setLessonId("");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/upload");
      xhr.withCredentials = true;
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setVideoUrl(res.videoUrl);
          setLessonId(res.lessonId);
        } else {
          setError("Upload failed: " + (xhr.responseText || xhr.statusText));
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setError("An error occurred during upload.");
      };
      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      setError("An error occurred: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Streaming Website</h1>
      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
      {uploading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {videoUrl && (
        <div className="video-section">
          <h2>Watch Your Video</h2>
          <VideoPlayer src={videoUrl} />
          <p className="video-link">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              Open HLS Playlist
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

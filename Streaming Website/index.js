import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const app = express();

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Fixed parameter order (req, file, cb)
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// CORS config
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.json({ message: "hello streaming website" });
});

app.post("/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const lessonId = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/courses/${lessonId}`;
  const hlsPath = `${outputPath}/index.m3u8`;

  try {
    // Create folder if doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
  } catch (err) {
    console.error(`❌ Directory creation error: ${err}`);
    return res.status(500).json({ error: "Failed to create output directory" });
  }

  // FFmpeg command
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  // Execute FFmpeg command
  exec(ffmpegCommand, (error, stdout, stderr) => {
    // Clean up the original uploaded file after processing
    try {
      fs.unlinkSync(videoPath);
    } catch (err) {
      console.error(`❌ Error deleting original file: ${err}`);
    }

    if (error) {
      console.error(`❌ FFmpeg Error: ${error.message}`);
      console.error(`FFmpeg stderr: ${stderr}`);
      return res.status(500).json({ error: "FFmpeg processing failed" });
    }

    console.log(`✅ FFmpeg Success:\nstdout: ${stdout}`);
    if (stderr) {
      console.log(`FFmpeg stderr: ${stderr}`);
    }

    const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;

    res.json({
      message: "✅ Video converted to HLS format", // Fixed typo "toS"
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

app.listen(8000, function () {
  console.log("🚀 App is listening at port 8000...");
});

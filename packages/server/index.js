const express = require("express");
const path = require("path");
const sharp = require("sharp");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup for both localhost and Render
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://picsbyschick.onrender.com", // Render deployment
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Serve static files from 'privatePhotos' in development mode
if (process.env.NODE_ENV === "development") {
  app.use(
    "/privatePhotos",
    express.static(path.join(__dirname, "privatePhotos"))
  );
}
// Serve static files for images in the production environment
if (process.env.NODE_ENV === "production") {
  app.use("/privatePhotos", express.static(path.join(__dirname, "privatePhotos")));
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}


app.get("/privatePhotos/:filename", async (req, res) => {
  const filename = req.params.filename;
  const width = parseInt(req.query.w) || 1200; // Defaults to 1200px if no width specified
  const ext = path.extname(filename).toLowerCase();

  const filePath = path.join(__dirname, "privatePhotos", filename);

  console.log("Requested image path:", filePath);
console.log("Resolved path:", filePath);

  try {
    if (ext === ".mp4") {
      res.sendFile(filePath); // Serve video file directly
    } else {
      // Check if image exists and process it with sharp
      const image = sharp(filePath);

      // Resize image based on query parameter (w)
      const resizedImage = await image.resize(width).toBuffer();

      // Set response content type to the image's MIME type (sharp handles it)
      res.type(path.extname(filename));

      // Send resized image buffer to the client
      res.send(resizedImage);
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(404).send("Image not found or error processing");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

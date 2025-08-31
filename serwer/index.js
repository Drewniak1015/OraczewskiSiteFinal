const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Zalogowano pomyślnie!" });
  } else {
    return res.status(401).json({ message: "Niepoprawny login lub hasło" });
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/photos/upload", upload.single("photo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Brak pliku" });

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "my_photos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({
      message: "Zdjęcie dodane",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Błąd uploadu:", err);
    res.status(500).json({ message: "Błąd uploadu", error: err });
  }
});

app.get("/api/photos/list", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "my_photos/",
    });

    const photos = result.resources.map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

    res.json(photos);
  } catch (err) {
    console.error("Błąd pobierania zdjęć:", err);
    res.status(500).json({ message: "Błąd pobierania zdjęć", error: err });
  }
});

app.delete("/api/photos/delete/:public_id", async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.public_id);

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary destroy result:", result);

    if (result.result === "ok") {
      res.json({ message: "Usunięto zdjęcie" });
    } else if (result.result === "not found") {
      res.status(404).json({ message: "Nie znaleziono pliku w Cloudinary" });
    } else {
      res.status(500).json({ message: "Nie udało się usunąć zdjęcia", result });
    }
  } catch (err) {
    console.error("Błąd usuwania zdjęcia:", err);
    res.status(500).json({ message: "Błąd usuwania zdjęcia", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
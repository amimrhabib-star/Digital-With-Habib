import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "studio_content.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create data directory:", err);
  }
}

// Safely read content file
function readContentFromDisk() {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading studio_content.json:", err);
  }
  return null;
}

// Safely write content file atomically
function writeContentToDisk(data: any) {
  try {
    const tempFile = `${CONTENT_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, CONTENT_FILE);
    return true;
  } catch (err) {
    console.error("Error writing studio_content.json:", err);
    return false;
  }
}

async function startServer() {
  const app = express();

  // Support large base64 media uploads (up to 150MB for video/photos)
  app.use(express.json({ limit: "150mb" }));
  app.use(express.urlencoded({ extended: true, limit: "150mb" }));

  // ==========================================
  // API ROUTES (MUST COME FIRST BEFORE VITE)
  // ==========================================

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // GET /api/content: authoritative persistent content across all visitors, devices & share links
  app.get("/api/content", (_req, res) => {
    const content = readContentFromDisk();
    if (content) {
      res.json({ success: true, data: content });
    } else {
      res.json({ success: true, data: null, message: "No custom overrides, using defaults" });
    }
  });

  // POST /api/content: saves user modifications permanently to server disk
  app.post("/api/content", (req, res) => {
    try {
      const incoming = req.body;
      if (!incoming || typeof incoming !== "object") {
        return res.status(400).json({ success: false, error: "Invalid payload" });
      }

      const existing = readContentFromDisk() || {};
      const merged = {
        ...existing,
        ...incoming,
        updatedAt: new Date().toISOString(),
      };

      const success = writeContentToDisk(merged);
      if (success) {
        return res.json({ success: true, message: "Content saved permanently to server" });
      } else {
        return res.status(500).json({ success: false, error: "Failed to persist to disk" });
      }
    } catch (err: any) {
      console.error("Error saving content:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });

  // POST /api/content/reset: restores original default stock photos and copy
  app.post("/api/content/reset", (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        fs.unlinkSync(CONTENT_FILE);
      }
      return res.json({ success: true, message: "Reset to default curated content" });
    } catch (err: any) {
      console.error("Error resetting content:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE & STATIC SERVING
  // ==========================================

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

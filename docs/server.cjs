var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var PORT = 3e3;
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var CONTENT_FILE = import_path.default.join(DATA_DIR, "studio_content.json");
if (!import_fs.default.existsSync(DATA_DIR)) {
  try {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create data directory:", err);
  }
}
function readContentFromDisk() {
  try {
    if (import_fs.default.existsSync(CONTENT_FILE)) {
      const raw = import_fs.default.readFileSync(CONTENT_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading studio_content.json:", err);
  }
  return null;
}
function writeContentToDisk(data) {
  try {
    const tempFile = `${CONTENT_FILE}.tmp.${Date.now()}`;
    import_fs.default.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    import_fs.default.renameSync(tempFile, CONTENT_FILE);
    return true;
  } catch (err) {
    console.error("Error writing studio_content.json:", err);
    return false;
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json({ limit: "150mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "150mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });
  app.get("/api/content", (_req, res) => {
    const content = readContentFromDisk();
    if (content) {
      res.json({ success: true, data: content });
    } else {
      res.json({ success: true, data: null, message: "No custom overrides, using defaults" });
    }
  });
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
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const success = writeContentToDisk(merged);
      if (success) {
        return res.json({ success: true, message: "Content saved permanently to server" });
      } else {
        return res.status(500).json({ success: false, error: "Failed to persist to disk" });
      }
    } catch (err) {
      console.error("Error saving content:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });
  app.post("/api/content/reset", (_req, res) => {
    try {
      if (import_fs.default.existsSync(CONTENT_FILE)) {
        import_fs.default.unlinkSync(CONTENT_FILE);
      }
      return res.json({ success: true, message: "Reset to default curated content" });
    } catch (err) {
      console.error("Error resetting content:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

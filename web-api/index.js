import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

// Pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/gardens", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data", "gardens.json");
    const data = await fs.readFile(dataPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur de lecture des données" });
  }
});

app.listen(PORT, () => {
  console.log(`API So-Close running on http://localhost:${PORT}`);
});
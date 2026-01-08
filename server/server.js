import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DATA_PATH = path.resolve(__dirname, "data.json");

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/todos", (req, res) => {
  fs.readFile(DATA_PATH, "utf8")
    .then((data) => res.json(JSON.parse(data)))
    .catch(() => res.status(500).json({ error: "Failed to read todos" }));
});

app.post("/todos", (req, res) => {
  fs.writeFile(DATA_PATH, JSON.stringify(req.body, null, 2))
    .then(() => res.json({ message: "Todos saved" }))
    .catch(() => res.status(500).json({ error: "Failed to save todos" }));
});

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

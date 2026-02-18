import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.get("/api", (_req, res) => {
  res.json({ message: "Hello from Dino Camp Roster API" });
});

app.get("/api/users", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, username, emoji FROM users ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { username } = req.body;
  if (Number.isNaN(id) || typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Invalid id or username" });
  }
  try {
    const { rows } = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, name, username, emoji",
      [username.trim(), id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

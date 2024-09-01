import express from "express";
import mysql from "mysql2/promise";
import { dbConfig } from "./mysql.config";

const app = express();

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

app.use(express.json());

const pool = mysql.createPool(dbConfig);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "データベースエラー" });
  }
});

app.get("/:id", async (req, res) => {
  console.log("id", req.params.id);

  try {
    const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [
      req.params.id,
    ]);

    console.log("rows", rows);

    if (Array.isArray(rows)) {
      if (rows.length === 0) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(rows[0]);
    } else {
      return res.status(500).json({ error: "Unexpected query result" });
    }
  } catch (error) {
    res.status(500).json({ error: "データベースエラー" });
  }
});

app.post("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "INSERT INTO todos (title, done) VALUES (?, ?)",
      [req.body.title, req.body.done]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "データベースエラー" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "UPDATE todos SET title = ?, done = ? WHERE id = ?",
      [req.body.title, req.body.done, req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "データベースエラー" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("DELETE FROM todos WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "データベースエラー" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

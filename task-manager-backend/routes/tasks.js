const express = require("express");
const router = express.Router();
const db = require("../config/database"); 
const authenticate = require('../middleware/authMiddleware');

//タスク一覧を取得 (GET /tasks)
router.get('/', authenticate, (req, res) => {
  //ミドルウェアからユーザーIDを取得
  const userId = req.userId;

  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    res.json(result);
  });
});

//特定のタスクを取得 (GET /tasks/:id)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM tasks WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    if (result.length === 0) {
      return res.status(404).send("タスクが見つかりません");
    }
    res.json(result[0]);
  });
});

// 新しいタスクを追加 (POST /tasks)
router.post("/", authenticate, (req, res) => {
  const { title, description, status, dueDate } = req.body;
  //ミドルウェアからユーザーIDを取得
  const userId = req.userId; 

  if (!title || !description) {
    return res.status(400).send("タイトルと説明が必要です");
  }

  const sql = `
    INSERT INTO tasks (title, description, status, due_date, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, description, status, dueDate, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの追加に失敗しました");
    }
    res.status(201).send("タスクを追加しました");
  });
});

// 特定のタスクを更新 (PUT /tasks/:id)
router.put("/:id", (req, res) => {
  const { title, description, status, dueDate } = req.body; 
  const { id } = req.params;

  if (!title || !description || !status) {
    return res.status(400).send("タイトル、説明、状態が必要です");
  }

  const sql = "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?";
  db.query(sql, [title, description, status, dueDate, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの更新に失敗しました");
    }
    res.send("タスクを更新しました");
  });
});

//特定のタスクを削除 (DELETE /tasks/:id)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM tasks WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの削除に失敗しました");
    }
    res.send("タスクを削除しました");
  });
});

module.exports = router;
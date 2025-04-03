const express = require("express");
const router = express.Router();
const db = require("../config/database"); // データベース接続をインポート

// 🟢 タスク一覧を取得 (GET /tasks)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM tasklist ORDER BY id DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("タスクの取得に失敗しました");
        } else {
            res.json(result);
        }
    });
});

// 🔵 新しいタスクを追加 (POST /tasks)
router.post("/", (req, res) => {
    const { TaskTitle, TaskDescription } = req.body;
    if (!TaskTitle || !TaskDescription) {
        return res.status(400).send("タイトルと説明が必要です");
    }

    const sql = "INSERT INTO tasklist (TaskTitle, TaskDescription) VALUES (?, ?)";
    db.query(sql, [TaskTitle, TaskDescription], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("タスクの追加に失敗しました");
        } else {
            res.status(201).send("タスクを追加しました");
        }
    });
});

// 🟡 特定のタスクを編集 (PUT /tasks/:id)
router.put("/:id", (req, res) => {
    const { TaskTitle, TaskDescription } = req.body;
    const { id } = req.params;

    const sql = "UPDATE tasklist SET TaskTitle = ?, TaskDescription = ? WHERE id = ?";
    db.query(sql, [TaskTitle, TaskDescription, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("タスクの更新に失敗しました");
        } else {
            res.send("タスクを更新しました");
        }
    });
});

// 🔴 特定のタスクを削除 (DELETE /tasks/:id)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tasklist WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("タスクの削除に失敗しました");
        } else {
            res.send("タスクを削除しました");
        }
    });
});

module.exports = router;
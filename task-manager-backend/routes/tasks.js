const express = require("express");
const router = express.Router();
const db = require("../config/database"); // データベース接続をインポート

// 🟢 タスク一覧を取得 (GET /tasks)
router.get("/", (req, res) => {
    const sql = "SELECT * FROM tasks ORDER BY id DESC";
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
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send("タイトルと説明が必要です");
    }

    const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, '未完了')";
    db.query(sql, [title, description], (err, result) => {
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
    const { title, description, status } = req.body;
    const { id } = req.params;

    // 必要なフィールドが揃っていない場合
    if (!title || !description || !status) {
        return res.status(400).send("タイトル、説明、状態が必要です");
    }

    const sql = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
    db.query(sql, [title, description, status, id], (err, result) => {
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
    const sql = "DELETE FROM tasks WHERE id = ?";
    
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
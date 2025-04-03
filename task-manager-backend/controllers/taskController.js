const db = require("../config/database");

// タスク一覧を取得する
const getTasks = (req, res) => {
    const sqlSelect = "SELECT * FROM tasks ORDER BY id";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving tasks from the database");
        } else {
            res.send(result);
        }
    });
};

// 新しいタスクを追加する
const addTask = (req, res) => {
    const { title, description, status } = req.body;
    const sqlInsert = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
    db.query(sqlInsert, [title, description, status], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to add new task");
        } else {
            res.status(200).send("Task added successfully");
        }
    });
};

// 特定のタスクを更新する
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const sqlUpdate = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
    db.query(sqlUpdate, [title, description, status, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to update task");
        } else {
            res.status(200).send("Task updated successfully");
        }
    });
};

// 特定のタスクを削除する
const deleteTask = (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM tasks WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete task");
        } else {
            res.status(200).send("Task deleted successfully");
        }
    });
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
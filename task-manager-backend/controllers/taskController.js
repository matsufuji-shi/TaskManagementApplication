const db = require("../config/database"); // データベース接続

// 全タスクを取得する
const getTasks = (req, res) => {
    const sqlSelect = "SELECT * FROM tasklist";  // tasklist テーブルから全タスクを取得
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving tasks from the database");
        } else {
            res.json(result);  // 取得したタスクをJSONで返す
        }
    });
};

// 新しいタスクを追加する
const addTask = (req, res) => {
    const { TaskTitle, TaskDescription } = req.body;  // フロントエンドから送られたタスク情報を取得
    const sqlInsert = "INSERT INTO tasklist (TaskTitle, TaskDescription) VALUES (?, ?)";
    
    db.query(sqlInsert, [TaskTitle, TaskDescription], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new task");
        } else {
            res.status(201).send("Task added successfully");
        }
    });
};

// 特定のタスクを編集する
const updateTask = (req, res) => {
    const taskId = req.params.id;  // URLパラメータからタスクIDを取得
    const { TaskTitle, TaskDescription } = req.body;  // フロントエンドから送られた新しいタスク情報を取得
    
    const sqlUpdate = "UPDATE tasklist SET TaskTitle = ?, TaskDescription = ? WHERE id = ?";
    
    db.query(sqlUpdate, [TaskTitle, TaskDescription, taskId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to update task");
        } else {
            res.send("Task updated successfully");
        }
    });
};

// 特定のタスクを削除する
const deleteTask = (req, res) => {
    const taskId = req.params.id;  // URLパラメータからタスクIDを取得
    
    const sqlDelete = "DELETE FROM tasklist WHERE id = ?";
    
    db.query(sqlDelete, [taskId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete task");
        } else {
            res.send("Task deleted successfully");
        }
    });
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
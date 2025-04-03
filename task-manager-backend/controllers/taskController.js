const db = require("../config/database");

// 全タスクを取得する
const getTasks = (req, res) => {
    const sqlSelect = "SELECT * FROM tasklist ORDER BY id";
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
const insertTask = (req, res) => {
    const { TaskTitle, TaskDescription } = req.body;
    const sqlInsert = "INSERT INTO tasklist (TaskTitle, TaskDescription) VALUES (?, ?)";
    db.query(sqlInsert, [TaskTitle, TaskDescription], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new task");
        } else {
            res.status(200).send("Task added successfully");
        }
    });
};

module.exports = { getTasks, insertTask };
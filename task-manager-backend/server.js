
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const app = express();

const userRoutes = require("./routes/auth");  // 既存のユーザー認証ルート
const tasksRouter = require("./routes/tasks"); // 追加するタスク管理ルート

app.use(express.json());
app.use(cors());

// データベース接続確認
db.getConnection((err, connection) => {
    if (err) {
        console.error("データベース接続エラー:", err);
        process.exit(1); // 接続失敗時にサーバを終了
    } else {
        console.log("データベース接続成功");
        connection.release(); // 接続が成功したらリリース
    }
});

// ユーザー関連のAPIルートを使用
app.use("/api", userRoutes);

// タスク管理用のAPIルートを追加
app.use("/api/tasks", tasksRouter);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
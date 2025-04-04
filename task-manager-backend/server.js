
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const app = express();

// 既存のルート
const userRoutes = require("./routes/auth");  // ユーザー認証ルート
const tasksRouter = require("./routes/tasks"); // タスク管理ルート

app.use(express.json());  // JSONのリクエストボディをパースする
app.use(cors()); 
app.use("/api/auth", userRoutes); // CORSを許可

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

// ユーザー認証ルートを追加
app.use("/api/auth", userRoutes);  // /api/auth にアクセスした際に auth.js を使用

// タスク管理用のAPIルートを追加
app.use("/api/tasks", tasksRouter);  // /api/tasks にアクセスした際に tasksRouter を使用

// サーバを起動
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
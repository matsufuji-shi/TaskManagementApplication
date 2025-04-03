const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/auth");  // 既存のユーザー認証ルート
const tasksRouter = require("./routes/tasks"); // 追加するタスク管理ルート

app.use(express.json());
app.use(cors());

// ユーザー関連のAPIルートを使用
app.use("/api", userRoutes);

//  タスク管理用のAPIルートを追加
app.use("/api/tasks", tasksRouter);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
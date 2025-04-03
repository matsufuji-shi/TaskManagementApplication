//どこに当たるか不明だったので作業の中で一致するものがあれば削除予定

const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

// ユーザー関連のAPIルートを使用
app.use("/api", userRoutes);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ユーザー登録
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "ユーザー名とパスワードを入力してください" });
  }

  try {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー情報をデータベースに保存
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "ユーザー登録に失敗しました" });
      }
      res.status(201).json({ message: "登録成功" });
    });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// ユーザーログイン
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "ユーザー名とパスワードを入力してください" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "サーバーエラー" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "パスワードが間違っています" });
    }

    // JWTトークンを発行
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    res.json({ token });
  });
});

module.exports = router;
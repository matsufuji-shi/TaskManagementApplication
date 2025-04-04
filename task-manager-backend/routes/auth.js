const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const JWT_SECRET = "your_secret_key"; // 環境変数に保存するのが望ましい

// **ユーザー登録API**
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // バリデーション（空チェック）
  if (!username || !password) {
    return res.status(400).json({ message: "ユーザー名とパスワードを入力してください" });
  }

  try {
    // **ユーザー名が既に存在しないかチェック**
    const checkUserSQL = "SELECT * FROM userslist WHERE username = ?";
    db.query(checkUserSQL, [username], async (err, results) => {
      if (err) {
        console.error("DBエラー:", err);
        return res.status(500).json({ message: "サーバーエラー" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "このユーザー名は既に使用されています" });
      }

      // **パスワードをハッシュ化**
      const hashedPassword = await bcrypt.hash(password, 10);

      // **ユーザーをDBに追加**
      const sql = "INSERT INTO userslist (username, password) VALUES (?, ?)";
      db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
          console.error("ユーザー登録エラー:", err);
          return res.status(500).json({ message: "ユーザー登録に失敗しました" });
        }
        res.status(201).json({ message: "ユーザー登録成功" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// **ユーザーログインAPI**
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // バリデーション（空チェック）
  if (!username || !password) {
    return res.status(400).json({ message: "ユーザー名とパスワードを入力してください" });
  }

  const sql = "SELECT * FROM userslist WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("DBエラー:", err);
      return res.status(500).json({ message: "サーバーエラー" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    const user = results[0];

    // **パスワードチェック**
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "パスワードが間違っています" });
    }

    // **JWTトークン発行**
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    // クライアントにトークンを返す
    res.json({ token, message: "ログイン成功" });
  });
});

module.exports = router;
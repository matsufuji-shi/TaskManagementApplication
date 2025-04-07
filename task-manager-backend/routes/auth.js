const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

// ↓ .env を使わないので直書きに変更
const JWT_SECRET = "your_super_secret_key"; // ※セキュリティに注意！

// **ユーザー登録API**
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "ユーザー名とパスワードを入力してください" });
  }

  try {
    const checkUserSQL = "SELECT * FROM userslist WHERE username = ?";
    db.query(checkUserSQL, [username], async (err, results) => {
      if (err) {
        console.error("DBエラー:", err);
        return res.status(500).json({ message: "サーバーエラー" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "このユーザー名は既に使用されています" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      //10はソルトの強度(セキュリティ度)
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
    //パスワード適合(bcrypt.compare(入力パスワード, 保存されてるハッシュ))
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "パスワードが間違っています" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "ログイン成功" });
  });
});

module.exports = router;
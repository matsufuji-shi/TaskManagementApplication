const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).send("トークンがありません");

  jwt.verify(token, 'your_super_secret_key', (err, decoded) => {
    if (err) return res.status(401).send("トークンの認証に失敗しました");

    req.userId = decoded.userId;  // ここでセット！
    next();
  });
};

module.exports = authenticate;
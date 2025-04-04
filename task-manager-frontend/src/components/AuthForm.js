import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // APIリクエスト用のAxiosインスタンス
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (type) => {
    setError(null); // エラーをクリア
    try {
      const response = await axiosInstance.post(`/auth/${type}`, { username, password });
      console.log(`${type} 成功:`, response.data);
      if (type === "login") {
        localStorage.setItem("token", response.data.token); // トークンを保存
        navigate("/"); // ログイン後、タスク一覧に遷移
      } else {
        alert("登録が完了しました！ログインしてください。");
      }
    } catch (err) {
      setError(err.response?.data || "認証に失敗しました");
    }
  };

  return (
    <div>
      <h2>ユーザー認証</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br/>
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={() => handleAuth("register")}>登録</button>
      <button onClick={() => handleAuth("login")}>ログイン</button>
    </div>
  );
}

export default AuthForm;
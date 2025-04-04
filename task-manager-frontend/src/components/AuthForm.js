import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";  // APIリクエスト用のインスタンスをインポート
import { useNavigate } from "react-router-dom";  // ページ遷移用

function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // エラーメッセージ
  const [loading, setLoading] = useState(false);  // ローディング状態
  const navigate = useNavigate();  // ページ遷移用

  const handleSubmit = async (event, action) => {
    event.preventDefault();  // フォーム送信時のページリロードを防ぐ

    // バリデーションチェック
    if (!username.trim()) {
      setError("ユーザー名を入力してください");
      return;
    }
    if (!password.trim()) {
      setError("パスワードを入力してください");
      return;
    }
    if (password.length < 6) {
      setError("パスワードは6文字以上にしてください");
      return;
    }

    setError("");  // エラーメッセージをクリア
    setLoading(true);  // ローディング開始

    try {
      let response;
      if (action === "register") {
        // ユーザー登録リクエスト
        response = await axiosInstance.post("/auth/register", { username, password });
      } else if (action === "login") {
        // ユーザーログインリクエスト
        response = await axiosInstance.post("/auth/login", { username, password });
      }

      console.log("レスポンス:", response.data);

      if (response.data.token) {
        // JWTトークンをローカルストレージに保存
        localStorage.setItem("token", response.data.token);
        
        // タスク管理ページにリダイレクト
        navigate("/tasks");  // ここを変更して、タスク管理ページへ遷移
      }
    } catch (err) {
      // エラーハンドリング
      setError(err.response?.data?.message || "エラーが発生しました");
    } finally {
      setLoading(false);  // ローディング終了
    }
  };

  return (
    <div>
      <h2>ユーザー登録 / ログイン</h2>
      <form>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // ユーザー名の変更
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
            // パスワードの変更
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}  
        {/* // エラーメッセージの表示 */}
        <button onClick={(e) => handleSubmit(e, "register")} disabled={loading}>
          {loading ? "登録中..." : "登録"}  
          {/* // ローディング中はボタンを無効化 */}
        </button>
        <button onClick={(e) => handleSubmit(e, "login")} disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}  
          {/* // ローディング中はボタンを無効化 */}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
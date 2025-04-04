import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function AuthForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async (event, action) => {
  //   event.preventDefault();

  //   if (!username.trim()) {
  //     setError("ユーザー名を入力してください");
  //     return;
  //   }
  //   if (!password.trim()) {
  //     setError("パスワードを入力してください");
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setError("パスワードは6文字以上にしてください");
  //     return;
  //   }

  //   setError("");
  //   setLoading(true);

  //   try {
  //     let response;
  //     if (action === "register") {
  //       response = await axiosInstance.post("/register", { username, password });
  //     } else if (action === "login") {
  //       response = await axiosInstance.post("/login", { username, password });
  //     }

  //     console.log("レスポンス:", response.data);

  //     if (response.data.token) {
  //       // ログイン後にトークンをlocalStorageに保存
  //       localStorage.setItem("token", response.data.token);
  //       setIsLoggedIn(true); // ログイン状態を更新

  //       // タスク一覧ページに遷移
  //       navigate("/"); 
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "エラーが発生しました");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event, action) => {
    event.preventDefault();

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

    setError("");  // エラーをリセット
    setLoading(true);  // ローディングを開始

    try {
      let response;
      if (action === "register") {
        response = await axiosInstance.post("/auth/register", { username, password });
      } else if (action === "login") {
        response = await axiosInstance.post("/auth/login", { username, password });
      }

      console.log("レスポンス:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);  // ログイン状態を更新
        navigate("/");  // タスク一覧に遷移
      }
    } catch (err) {
      // AxiosErrorの詳細を表示
      console.error("ログインエラー:", err.response ? err.response.data : err.message);
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={(e) => handleSubmit(e, "register")} disabled={loading}>
          {loading ? "登録中..." : "登録"}
        </button>
        <button onClick={(e) => handleSubmit(e, "login")} disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import AuthForm from "./components/AuthForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ログイン状態を確認するために、初期レンダリング時にlocalStorageを確認
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>タスク管理ページ</h1>
        <Routes>
          {/* ログインしていない場合はAuthFormにリダイレクト */}
          <Route
            path="/auth"
            element={
              isLoggedIn ? (
                <Navigate to="/" /> // すでにログインしている場合はタスク一覧にリダイレクト
              ) : (
                <AuthForm setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          
          {/* ログインしている場合のみタスク管理ページを表示 */}
          <Route
            path="/"
            element={isLoggedIn ? <TaskList /> : <Navigate to="/auth" />}
          />
          
          {/* 新しいタスク追加ページ */}
          <Route path="/add-task" element={isLoggedIn ? <TaskForm /> : <Navigate to="/auth" />} />
          
          {/* 特定のタスク詳細ページ */}
          <Route path="/tasks/:id" element={isLoggedIn ? <TaskDetail /> : <Navigate to="/auth" />} />
          
          {/* 編集画面ページ */}
          <Route path="/edit/:id" element={isLoggedIn ? <TaskForm /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import AuthForm from "./components/AuthForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //ログイン状態を確認
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <h1>タスク管理ページ</h1>

        {/* useLocation フックをRouter内で使用 */}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <TaskList />
                  <LogoutButton onLogout={handleLogout} />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <AuthForm setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/add-task"
            element={isLoggedIn ? <TaskForm /> : <Navigate to="/auth" />}
          />
          <Route
            path="/tasks/:id"
            element={isLoggedIn ? <TaskDetail /> : <Navigate to="/auth" />}
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <TaskForm /> : <Navigate to="/auth" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

// ログアウトボタンのコンポーネント
const LogoutButton = ({ onLogout }) => {
  const location = useLocation(); 

  return (
    location.pathname === "/" && (
      <button onClick={onLogout}>ログアウト</button>
    )
  );
};

export default App;
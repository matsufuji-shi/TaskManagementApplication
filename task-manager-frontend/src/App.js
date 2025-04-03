import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>タスク管理ページ</h1>
        <Routes>
          {/* タスク一覧ページ（ホーム） */}
          <Route path="/" element={<TaskList />} />

          {/* 新しいタスク追加ページ */}
          <Route path="/add-task" element={<TaskForm />} />

          {/* 特定のタスク詳細ページ（例: /task/1） */}
          <Route path="/task/:id" element={<TaskDetail />} />

          {/* タスク管理ページ */}
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
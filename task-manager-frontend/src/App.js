
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>タスク管理ページ</h1>
        <Routes>
          {/* タスク一覧ページ */}
          <Route path="/" element={<TaskList />} />
          {/* 新しいタスク追加ページ */}
          <Route path="/add-task" element={<TaskForm />} />
          {/* 特定のタスク詳細ページ */}
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
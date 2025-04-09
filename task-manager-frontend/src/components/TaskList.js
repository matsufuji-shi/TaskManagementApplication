import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // タスクの取得
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  // 初期のタスク取得
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>タスク管理ページ</h1>
      <h2>タスク一覧</h2>

      {tasks.map((task) => (
        <p key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </p>
      ))}
      {/* 追加後一覧取得 */}
      <TaskForm onTaskAdded={fetchTasks} /> 
    </div>
  );
};

export default TaskList;
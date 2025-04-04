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
      setTasks(data);  // タスクを状態としてセット
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
      <h2>タスク一覧</h2>

      {tasks.map((task) => (
        <p key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </p>
      ))}
      
      <TaskForm onTaskAdded={fetchTasks} />  {/* 新しいタスクが追加された後にリスト更新 */}
    </div>
  );
};

export default TaskList;
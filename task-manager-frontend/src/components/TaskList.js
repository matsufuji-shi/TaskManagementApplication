import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskForm from "./TaskForm";
import { Link, useNavigate } from "react-router-dom";

const TaskList = ({ setIsLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ログインしたユーザーのIDをlocalStorageから取得
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));  // JWTトークンをデコード
    return decodedToken.userId;  // トークン内のuserIdを返す
  };

  const userId = getUserId();

  // タスクを取得する関数
  const fetchTasks = async () => {
    try {
      if (userId) {
        const data = await getTasks(userId);  // ユーザーIDを渡してタスクを取得
        setTasks(data);
      } else {
        console.log("ユーザーIDが取得できません");
      }
    } catch (error) {
      console.error("タスクの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ログイン時またはuserIdが変わった時にタスクを再取得
  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);  // userIdが変更されるたびに再取得

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <div className="tasklist">
      <h1>タスク管理ページ</h1>
      <button onClick={handleLogout} className="logout taskButton">ログアウト</button>

      <h2>タスク一覧</h2>

      {isLoading ? (
        <p>タスクを読み込んでいます...</p>
      ) : tasks.length === 0 ? (
        <p>タスクがありません</p>
      ) : (
        tasks.map((task) => (
          <p key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
          </p>
        ))
      )}

      {/* タスク追加後、一覧を再取得 */}
      <TaskForm onTaskAdded={fetchTasks} />
    </div>
  );
};

export default TaskList;
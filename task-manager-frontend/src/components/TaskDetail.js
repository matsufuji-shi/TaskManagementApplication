import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function TaskDetail() {
  const { id } = useParams(); // URLのIDを取得
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        setTask(response.data); // タスク情報をstateに保存
      } catch (error) {
        console.error("タスクの取得に失敗しました", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      console.log("タスクが削除されました");
      navigate("/"); // 削除後、一覧ページに戻る
    } catch (error) {
      console.error("タスクの削除に失敗しました", error);
    }
  };

  return (
    <div>
      <h1>タスク詳細</h1>
      {task ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <Link to={`/edit/${id}`}><button>編集</button></Link>
          <button onClick={handleDelete}>削除</button>
        </>
      ) : (
        <p>タスクを読み込み中...</p>
      )}
    </div>
  );
}

export default TaskDetail;
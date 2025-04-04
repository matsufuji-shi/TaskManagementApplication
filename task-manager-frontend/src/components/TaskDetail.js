import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";  // axiosインスタンスをインポート

function TaskDetail() {
  const { id } = useParams(); // URLのIDを取得
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);  // ローディング状態の管理
  const [error, setError] = useState(null);  // エラー状態の管理
  const navigate = useNavigate();

  // タスクの取得
  useEffect(() => {
    console.log("Task ID from useParams:", id);  // idをログに出力

    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axiosInstance.get(`/tasks/${id}`);
          console.log("API response:", response.data);
          setTask(response.data); // タスク情報をstateに保存
          setLoading(false);  // ロード完了
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
          setError("タスクの取得に失敗しました");
          setLoading(false);  // ロード完了
        }
      };
      fetchTask();
    } else {
      console.log("idが取得できていません");
    }
  }, [id]);

  // タスクの削除
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      console.log("タスクが削除されました");
      navigate("/"); // 削除後、一覧ページに戻る
    } catch (error) {
      console.error("タスクの削除に失敗しました", error);
    }
  };

  // ローディング状態の表示
  if (loading) {
    return <p>タスクを読み込み中...</p>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return <p>{error}</p>;
  }

  // タスクが見つかった場合の表示
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
        <p>タスクが存在しません。</p>
      )}
    </div>
  );
}

export default TaskDetail;
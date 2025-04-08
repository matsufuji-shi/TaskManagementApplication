import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";  // axiosインスタンスをインポート

function TaskDetail() {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // タスクの取得
  useEffect(() => {

    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axiosInstance.get(`/tasks/${id}`);
          setTask(response.data);
          setLoading(false);
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
          setError("タスクの取得に失敗しました");
          setLoading(false);  
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
          <p><strong>期限日:</strong> {new Date(task.due_date).toLocaleDateString()}</p>  {/* 期限日を表示 */}
          <p><strong>ステータス:</strong> {task.status}</p>  {/* ステータスを表示 */}
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
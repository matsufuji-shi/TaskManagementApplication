import React from "react";
import { useParams, Link } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams(); // URLのIDを取得

  return (
    <div>
      <h1>タスク詳細</h1>
      <h2>実務課題作成</h2>
      {/* これがどう映るかテーブル編集後に再確認。 */}
      {/* タスク内容がテーブルのidから引っ張て来て表示されているならばOK */}
      <p>タスク {id} の詳細ページ</p>
      {/* 編集ボタンに変更 */}
      <Link to={`/edit/${id}`}><button>編集</button></Link>
    </div>
  );
}

export default TaskDetail;
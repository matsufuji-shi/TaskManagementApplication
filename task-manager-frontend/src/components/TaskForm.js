import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const navigate = useNavigate(); // ページ遷移用のフック

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("新しいタスク:", taskName);
    navigate("/"); // タスク一覧ページに戻る
  };

  return (
    <div>
      <h2>タスクを追加</h2>
      {/* 編集にも使用するので編集の場合は編集になるようにしたい */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タスクのタイトル"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
         <input
          type="text"
          placeholder="タスクの説明"
          value={taskDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>
    </div>
  );
}

export default TaskForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../services/taskService";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const navigate = useNavigate(); // ページ遷移用のフック

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      alert("タスクのタイトルと説明を入力してください");
      return;
    }

    try {
      await addTask({ TaskTitle: taskName, TaskDescription: taskDescription });
      console.log("タスクが追加されました:", taskName);
      navigate("/"); // タスク一覧ページに戻る
    } catch (error) {
      console.error("タスクの追加に失敗しました", error);
    }
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
        <br/>
         <input
          type="text"
          placeholder="タスクの説明"
          value={taskDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br/>
        <button type="submit">追加</button>
      </form>
    </div>
  );
}

export default TaskForm;
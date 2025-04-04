import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../services/taskService";
import axiosInstance from "../api/axiosInstance";
import { getTasks } from "../services/taskService"; // getTasksをインポート

function TaskForm() {
  const { id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [originalTaskName, setOriginalTaskName] = useState("");  // 編集前のタイトル
  const [originalDescription, setOriginalDescription] = useState("");  // 編集前の説明
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // 編集時に既存のタスク情報を取得
  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const response = await axiosInstance.get(`/tasks/${id}`);
          setTaskName(response.data.title);
          setDescription(response.data.description);
          setOriginalTaskName(response.data.title);  // 編集前のタイトルを保存
          setOriginalDescription(response.data.description);  // 編集前の説明を保存
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
        }
      };
      fetchTask();
    }
  }, [id, isEditing]);

  // 保存ボタンの処理
  const handleSave = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      alert("タスクのタイトルと説明を入力してください");
      return;
    }

    try {
      if (isEditing) {
        // 更新処理
        await axiosInstance.put(`/tasks/${id}`, {
          title: taskName,
          description: taskDescription,
          status: "未完了",  // 状態は未完了に設定（必要に応じて変更）
        });
        console.log("タスクが更新されました:", taskName);
      } else {
        // 追加処理
        await addTask({ title: taskName, description: taskDescription });
        console.log("タスクが追加されました:", taskName);
        // タスク追加後、TaskList.jsでタスク一覧を再取得
        const tasks = await getTasks();  // 再取得
        console.log("新しいタスク一覧:", tasks);
      }
      navigate("/"); // 一覧ページにリダイレクト
    } catch (error) {
      console.error("タスクの処理に失敗しました", error);
    }
  };

  // キャンセルボタンの処理
  const handleCancel = () => {
    setTaskName(originalTaskName);  // 編集前のタイトルに戻す
    setDescription(originalDescription);  // 編集前の説明に戻す
    navigate(`/tasks/${id}`);  // 詳細ページに戻る
  };

  return (
    <div>
      <h2>{isEditing ? "タスクを編集" : "タスクを追加"}</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="タスクのタイトル"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="タスクの説明"
          value={taskDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">{isEditing ? "保存" : "追加"}</button>
        {isEditing && <button type="button" onClick={handleCancel}>キャンセル</button>}
      </form>
    </div>
  );
}

export default TaskForm;
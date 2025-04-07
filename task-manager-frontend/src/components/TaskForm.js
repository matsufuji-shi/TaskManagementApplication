import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../services/taskService";
import axiosInstance from "../api/axiosInstance";

function TaskForm({ onTaskAdded }) {
  const { id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");  // 期限日
  const [status, setStatus] = useState("未完了");  // ステータス（未完了、完了）
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
          setDueDate(response.data.dueDate);  // 期限日の取得
          setStatus(response.data.status);  // ステータスの取得
          setOriginalTaskName(response.data.title);
          setOriginalDescription(response.data.description);
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

    // バリデーション（空チェック）
    if (!taskName || !taskDescription || !dueDate) {
      alert("タスクのタイトル、説明、期限日を入力してください");
      return;
    }

    try {
      const taskData = {
        title: taskName,
        description: taskDescription,
        dueDate: dueDate,
        status: status,  // ステータスを追加
      };

      if (isEditing) {
        // 更新処理
        await axiosInstance.put(`/tasks/${id}`, taskData);
        console.log("タスクが更新されました:", taskName);
      } else {
        // 追加処理
        await addTask(taskData);
        console.log("タスクが追加されました:", taskName);
        // タスク追加後にリストを更新
        if (onTaskAdded) {
          onTaskAdded();
        }
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
    setDueDate("");  // 期限日をリセット
    setStatus("未完了");  // ステータスをリセット
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
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="未完了">未完了</option>
          <option value="完了">完了</option>
        </select>
        <br />
        <button type="submit">{isEditing ? "保存" : "追加"}</button>
        {isEditing && <button type="button" onClick={handleCancel}>キャンセル</button>}
      </form>
    </div>
  );
}

export default TaskForm;
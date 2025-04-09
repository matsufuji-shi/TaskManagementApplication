import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../services/taskService";
import axiosInstance from "../api/axiosInstance";

function TaskForm({ onTaskAdded }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // まとめて管理する formState
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "未完了",
  });

  const [originalFormState, setOriginalFormState] = useState(formState);

  // 編集モードならデータ取得
  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const { data } = await axiosInstance.get(`/tasks/${id}`);
          setFormState({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            status: data.status,
          });
          setOriginalFormState({
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            status: data.status,
          });
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
        }
      };
      fetchTask();
    }
  }, [id, isEditing]);

  // 共通の変更ハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 保存処理
  const handleSave = async (e) => {
    e.preventDefault();

    const { title, description, dueDate, status } = formState;
    if (!title || !description || !dueDate) {
      alert("タスクのタイトル、説明、期限日を入力してください");
      return;
    }

    try {
      if (isEditing) {
        await axiosInstance.put(`/tasks/${id}`, formState);
        console.log("タスクが更新されました:", title);
      } else {
        await addTask(formState);
        console.log("タスクが追加されました:", title);

        setFormState({
          title: "",
          description: "",
          dueDate: "",
          status: "未完了",
        });
        if (onTaskAdded) onTaskAdded();
      }
      navigate("/");
    } catch (error) {
      console.error("タスクの処理に失敗しました", error);
    }
  };

  // キャンセル処理
  const handleCancel = () => {
    setFormState(originalFormState);
    navigate(`/tasks/${id}`);
  };

  return (
    <div className={isEditing ? "tasklist" : ""}>
      <h2>{isEditing ? "タスクを編集" : "タスクを追加"}</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          name="title"
          placeholder="タスクのタイトル"
          value={formState.title}
          onChange={handleChange}
          className="taskInput"
        />
        <br />
        <textarea
          name="description"
          placeholder="タスクの説明"
          value={formState.description}
          onChange={handleChange}
          className="taskInput"
        />
        <br />
        期限日：
        <input
          type="date"
          name="dueDate"
          value={formState.dueDate}
          onChange={handleChange}
        />
        <br />
        ステータス：
        <select name="status" value={formState.status} onChange={handleChange}>
          <option value="未完了">未完了</option>
          <option value="完了">完了</option>
        </select>
        <br />
        <button type="submit" className="taskButton">{isEditing ? "保存" : "追加"}</button>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="taskButton">
            キャンセル
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
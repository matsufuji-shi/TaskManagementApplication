import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, getTaskById, updateTask } from "../services/taskService";

function TaskForm() {
  const { id } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const task = await getTaskById(id);
          setTaskName(task.TaskTitle);
          setDescription(task.TaskDescription);
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
        }
      };
      fetchTask();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      alert("タスクのタイトルと説明を入力してください");
      return;
    }

    try {
      if (isEditing) {
        await updateTask(id, { TaskTitle: taskName, TaskDescription: taskDescription });
        console.log("タスクが更新されました:", taskName);
      } else {
        await addTask({ TaskTitle: taskName, TaskDescription: taskDescription });
        console.log("タスクが追加されました:", taskName);
      }
      navigate("/");
    } catch (error) {
      console.error("タスクの処理に失敗しました", error);
    }
  };

  return (
    <div>
      <h2>{isEditing ? "タスクを編集" : "タスクを追加"}</h2>
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
        <button type="submit">{isEditing ? "更新" : "追加"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
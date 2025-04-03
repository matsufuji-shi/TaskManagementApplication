import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { Link } from "react-router-dom"; // ← 追加

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>タスク一覧</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom"; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
                //taskService.jsからリストを受け取りdataへ入れる
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>タスク一覧</h2>
            
                {tasks.map((task) => (
                    <p key={task.id}>
                        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                    </p>
                ))}
            <TaskForm />
        </div>
    );
};

export default TaskList;
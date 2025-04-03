import axiosInstance from "../api/axiosInstance";

// タスク一覧を取得
export const getTasks = async () => {
    try {
        const response = await axiosInstance.get("/tasks");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// 新しいタスクを追加
export const addTask = async (taskData) => {
    try {
        const response = await axiosInstance.post("/tasks", taskData);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};
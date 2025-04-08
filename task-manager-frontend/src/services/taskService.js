import axiosInstance from "../api/axiosInstance";

// トークンをローカルストレージから取得する
const getAuthToken = () => {
    return localStorage.getItem("token");
};

// タスク一覧を取得
export const getTasks = async () => {
    try {
        const token = getAuthToken();
        const response = await axiosInstance.get("/tasks", {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// 新しいタスクを追加
export const addTask = async (taskData) => {
    try {
        const token = getAuthToken(); 
        const response = await axiosInstance.post("/tasks", taskData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};
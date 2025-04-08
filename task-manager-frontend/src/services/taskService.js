import axiosInstance from "../api/axiosInstance";

// トークンをローカルストレージから取得する関数
const getAuthToken = () => {
    return localStorage.getItem("token");  // ローカルストレージからトークンを取得
};
if (!getAuthToken) {
    console.log('User is not logged in');
    // ログインページにリダイレクトする等の処理
  }

// タスク一覧を取得
export const getTasks = async () => {
    try {
        const token = getAuthToken();  // トークンを取得
        const response = await axiosInstance.get("/tasks", {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",  // トークンがあればヘッダーに追加
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
        const token = getAuthToken();  // トークンを取得
        const response = await axiosInstance.post("/tasks", taskData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",  // トークンがあればヘッダーに追加
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};
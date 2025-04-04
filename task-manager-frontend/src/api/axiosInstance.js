import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", //バックエンドのAPIのURL
  headers: {
    "Content-Type": "application/json",
  },
});
// リクエスト時に自動でJWTトークンをヘッダーに追加
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default axiosInstance;
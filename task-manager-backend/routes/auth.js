const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); // タスク関連のコントローラをインポート

// タスク一覧を取得する
router.get("/", taskController.getTasks);  // GET /api/tasks

// 新しいタスクを追加する
router.post("/", taskController.addTask);  // POST /api/tasks

// 特定のタスクを編集する
router.put("/:id", taskController.updateTask);  // PUT /api/tasks/:id

// 特定のタスクを削除する
router.delete("/:id", taskController.deleteTask);  // DELETE /api/tasks/:id

module.exports = router;
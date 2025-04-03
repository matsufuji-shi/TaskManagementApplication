import React from "react";
import { Link } from "react-router-dom";

function TaskList() {
  return (
    <div>
      <h2>タスク一覧表</h2>
      
        <Link to="/task/1">実務課題作成</Link>
        <br />
        <Link to="/task/2">スキルシート作成</Link>
        <br />
        <Link to="/task/3">研修担当会議</Link>
        <br />
        <Link to="/add-task">新しいタスクを追加</Link>
    </div>
    
  );
}

export default TaskList;
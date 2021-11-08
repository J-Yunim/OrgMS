import React from "react";
import "./index.css";

const priorityName = ["TOP", "MID", "LOW"];
const priorityColor = ["#EA6A6A", "#EA8C6A", "#BEEA6A"];
const text = "这是一段描述一段描述一段描述一段描述";

function TaskCard() {
  return (
    <div className="taskcard">
      <div className="taskcard-tags">
        <div
          className="taskcard-tag"
          style={{ backgroundColor: priorityColor[0], color: "white" }}
        >
          {priorityName[0]}
        </div>
        <div className="taskcard-tag">Finance</div>
        <div className="taskcard-tag">CharlotteW</div>
      </div>
      <p className="taskcard-desc">
        {text.length > 15 ? `${text.substring(0, 15)}...` : text}
      </p>
    </div>
  );
}

export default TaskCard;

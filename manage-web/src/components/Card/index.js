import React from "react";
import "./index.css";

const priorityName = ["TOP", "MID", "LOW"];
const priorityColor = ["#EA6A6A", "#EA8C6A", "#BEEA6A"];
const text = "这是一段描述一段描述一段描述一段描述";

function TaskCard(props) {
  const { priority, department, owner, title } = props.task;
  return (
    <div className="taskcard">
      <div className="taskcard-tags">
        <div
          className="taskcard-tag"
          style={{ backgroundColor: priorityColor[priority], color: "white" }}
        >
          {priorityName[priority]}
        </div>
        <div className="taskcard-tag">{department}</div>
        <div className="taskcard-tag">{owner}</div>
      </div>
      <p className="taskcard-desc">
        {title.length > 15 ? `${title.substring(0, 15)}...` : title}
      </p>
    </div>
  );
}

export default TaskCard;

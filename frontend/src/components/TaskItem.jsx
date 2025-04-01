import React from "react";

const TaskItem = ({ task, onToggle }) => {
    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task._id)}
                className="task-checkbox"
            />
            <div className="task-content">
                <strong className={task.completed ? "task-completed" : ""}>{task.name}</strong>
                {task.tags && task.tags.length > 0 && (
                    <span className="task-tags">{task.tags.join(", ")}</span>
                )}
            </div>
        </div>
    );
};

export default TaskItem;

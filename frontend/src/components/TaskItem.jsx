import React from "react";

const TaskItem = ({ task }) => {
    return (
        <>
            <strong>{task.name}</strong>
            <br />
            {task.start_date && (
                <span className="task-date">Start Date: {new Date(task.start_date).toLocaleDateString()}</span>
            )}
            <br />
            {task.end_date && (
                <span className="task-date">End Date: {new Date(task.end_date).toLocaleDateString()}</span>
            )}
            <br />
            {task.tags && task.tags.length > 0 && (
                <span className="task-tags">Tags: {task.tags.join(", ")}</span>
            )}
        </>
    );
};

export default TaskItem;

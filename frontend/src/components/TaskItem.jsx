import React from "react";

const TaskItem = ({ task }) => {
    return (
        <li key={task._id}>
            <strong>{task.name}</strong><br />
            {task.start_date && (
                <span>Start Date: {new Date(task.start_date).toLocaleDateString()}</span>
            )}
            <br />
            {task.end_date && (
                <span>End Date: {new Date(task.end_date).toLocaleDateString()}</span>
            )}
            <br />
            {task.tags && task.tags.length > 0 && (
                <span>Tags: {task.tags.join(", ")}</span>
            )}
        </li>
    );
};

export default TaskItem;

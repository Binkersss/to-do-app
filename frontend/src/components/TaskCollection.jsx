import React from "react";
import TaskItem from "./TaskItem";

const TaskCollection = ({ tasks, onToggle }) => {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onToggle={onToggle} />
            ))}
        </div>
    );
};

export default TaskCollection;

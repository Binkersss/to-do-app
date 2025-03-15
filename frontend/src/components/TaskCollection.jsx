import React from "react";
import TaskItem from "./TaskItem";

const TaskCollection = ({ tasks }) => {
    return (
        <div className="task-grid">
            {tasks.map((task) => (
                <div className="task-item" key={task._id}>
                    <TaskItem task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskCollection;

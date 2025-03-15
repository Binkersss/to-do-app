import { useState } from "react";
import TextBar from "../components/TextBar";
import "../App.css";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);

    const handleTaskSubmit = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div className="home-container">
            <h1 className="title">Task Manager</h1>
            <TextBar onTaskSubmit={handleTaskSubmit} />
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <strong>{task.text}</strong>
                        {task.dates.length > 0 && <p className="task-date">📅 {task.dates.join(", ")}</p>}
                        {task.tags.length > 0 && <p className="task-tags">🏷️ {task.tags.join(", ")}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;

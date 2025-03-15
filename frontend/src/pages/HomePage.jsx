import { useEffect, useState } from 'react';
import TextBar from "../components/TextBar.jsx";
import TaskItem from "../components/TaskItem.jsx";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetch('/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleTaskSubmit = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div className="home-container">
            <h1 className="title">Task Manager</h1>
            <TextBar onTaskSubmit={handleTaskSubmit} />
            <ul className="task-list">
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
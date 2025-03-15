import { useState } from "react";
import "../App.css";

const TextBar = ({ onTaskSubmit }) => {
    const [input, setInput] = useState("");

    // Handle input change
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // Parse tags from input text
    const parseTags = (text) => {
        const tagRegex = /@\w+/g; // Matches words starting with '@'
        return text.match(tagRegex) || [];
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = input.replace(/@\w+/g, "").trim(); // Remove tags from task name
        const tags = parseTags(input);

        const newTask = { name, tags };

        // Send POST request to create a new task
        try {
            const response = await fetch("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const data = await response.json();
                onTaskSubmit(data); // Update parent component with new task
                setInput(""); // Clear input field
            } else {
                console.error("Error creating task:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <form className="text-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a task..."
                className="text-input"
            />
            <button type="submit" className="send-btn">➕</button>
        </form>
    );
};

export default TextBar;

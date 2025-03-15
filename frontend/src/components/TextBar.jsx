import { useState } from "react";
import "../App.css";

const TextBar = ({ onTaskSubmit }) => {
    const [input, setInput] = useState("");

    const parseTask = (text) => {
        const dateRegex = /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|\d{1,2}\/\d{1,2}\/\d{2,4})(?:\s*-\s*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|\d{1,2}\/\d{2,4}))?\b/g;
        const tagRegex = /@\w+/g;

        const dates = text.match(dateRegex) || [];
        const tags = text.match(tagRegex) || [];
        const cleanText = text.replace(dateRegex, "").replace(tagRegex, "").trim();

        return { text: cleanText, dates, tags };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        onTaskSubmit(parseTask(input));
        setInput(""); // Clear input
    };

    return (
        <form onSubmit={handleSubmit} className="text-bar">
            <input
                type="text"
                placeholder="Type a task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-input"
            />
            <button type="submit" className="send-btn">➕</button>
        </form>
    );
};

export default TextBar;

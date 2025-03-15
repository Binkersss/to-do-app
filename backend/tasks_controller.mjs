import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import Task from './task.mjs';
import * as tasks from './tasks_model.mjs';

const PORT = process.env.PORT || 3000;

const ERROR_NOT_FOUND = { Error: 'Not Found' };
const ERROR_INVALID_REQUEST = { Error: 'Invalid Request' };

const app = express();
app.use(express.json());

app.listen(PORT, async () => {
    await tasks.connect();
    console.log('Server listening on port:', PORT);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

/**
 * Create a new task
 */
app.post('/tasks', asyncHandler(async (req, res) => {
    const { name, start_date, end_date, tags } = req.body;

    try {
        const newTask = await tasks.createTask({
            name,
            start_date: start_date || null,
            end_date: end_date || null,
            tags: tags || []
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({Eror: "Server not found"});
    }
}));

app.get('/tasks', asyncHandler( async (req, res) => {
    const foundTasks = await tasks.getTasks(req.query);
    res.status(200).json(foundTasks);
}));

app.get('/tasks/undated', asyncHandler( async (req, res) => {

    try {
        const query = req.query;

        const foundUndatedTasks = await tasks.getUndatedTasks(query);

        res.status(200).json(foundUndatedTasks);
    } catch (error) {
        console.error("Error fetching undated tasks:", error);
        res.status(500).json({ error: "Failed to fetch undated tasks" });
    }

}));

app.get('/tasks/:_id', asyncHandler( async (req, res) => {
    const foundTask = await tasks.getTaskById(req.params._id);

    if (foundTask !== null) {
        res.status(200).json(foundTask);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

app.put('/tasks/:_id', asyncHandler( async (req, res) => {
    const { name, start_date, end_date, tags } = req.body;

    const updatedTask = await tasks.updateTask(req.params._id, name, start_date, end_date, tags);

    if (updatedTask !== null) {
        res.status(200).json(updatedTask);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

app.delete('/tasks/:_id', asyncHandler( async (req, res) => {
    const deletedCount = await tasks.deleteTaskById(req.params._id);

    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));
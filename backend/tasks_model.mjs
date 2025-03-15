import mongoose from 'mongoose';
import 'dotenv/config';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    tags: { type: [String], required: false },
}, {versionKey: '__v'});

const Task = mongoose.model('Task', taskSchema);

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error("Could not connect to MongoDB:", err.message);
        throw err;
    }
}

async function createTask(taskData) {
    const newTask = new Task(taskData);
    return await newTask.save();
}

async function getTasks(query) {
    return await Task.find(query);
}

async function getUndatedTasks(query) {
    try {
        const undatedTasks = await Task.find(
            {end_date: null,
                ...query
            });
        return undatedTasks;
    } catch (error) {
        console.error("Error fetching undated tasks:", error);
        throw error;
    }
}

async function getTaskById(taskId) {
    return await Task.findById(taskId);
}

async function updateTask(taskId, taskData) {

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set:  taskData },
            { new: true }
        );

        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

async function deleteTaskById(taskId) {
    try {
        const result = await Task.findByIdAndDelete(taskId);
        if (!result) {
            return 0;
        }
        return 1;

    } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Error deleting task: ");
    }
}

export {connect, createTask, getTasks, getUndatedTasks, getTaskById, updateTask, deleteTaskById};
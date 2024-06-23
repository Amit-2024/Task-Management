import { Task } from './../model/task.model.js';

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        if(!tasks){
            return res.status(200).json({})
        }
        
        return res
        .status(200)
        .json({ data: tasks, success: "All tasks retrieved successfully" })
    } catch (error) {
        console.log("Error in getAllTasks controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body
    
        if(!title || !description || !dueDate){
            return res.status(400).json({ error: "All fields are required" })
        }

        const newTask = await Task.create({
            title,
            description,
            dueDate
        })

        if(!newTask){
            return res.status(500).json({error: "Something went wrong while creating the task"})
        }

        return res
        .status(201)
        .json({ data: newTask, success: "New task created successfully" })
    } catch (error) {
        console.log("Error in createTask controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id: taskId } = req.params

        if(!taskId){
            return res.status(400).json({ error: "Task Id is required" })
        }

        const task = await Task.findById(taskId)

        if(!task){
            return res.status(404).json({ error: "Task not found" })
        }

        return res
        .status(200)
        .json({ data: task, success: "Task found successfully" })
    } catch (error) {
        console.log("Error in getTaskById controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const { title, description, dueDate } = req.body

        if(!taskId){
            return res.status(400).json({ error: "Task Id is required" })
        }

        if (!title && !description && !dueDate) {
            return res.status(400).json({ error: "At least one field (title, description, dueDate) is required for update" });
        }

        const task = await Task.findById(taskId)

        if(!task){
            return res.status(404).json({ error: "Task not found" })
        }

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (dueDate !== undefined) updateFields.dueDate = dueDate;

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateFields,
            { new: true, runValidators: true }
        );

        if(!updatedTask){
            return res.status(400).json({ error: "Error occurred while updating the task" })
        }

        return res
        .status(200)
        .json({ data: updatedTask, success: "Task updated successfully" })

    } catch (error) {
        console.log("Error in updateTask controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params

        if(!taskId){
            return res.status(400).json({ error: "Task Id is required" })
        }

        const deletedTask = await Task.findByIdAndDelete(taskId)
        if(!deletedTask){
            return res.status(400).json({ error: "Error occurred while deleting the task" })
        }

        return res
        .status(200)
        .json({ success: "Task deleted successfully" })
    } catch (error) {
        console.log("Error in deleteTask controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

export {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}
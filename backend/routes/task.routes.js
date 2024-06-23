import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controller/task.controller.js";

const router = Router()

router
.route("/")
.get(getAllTasks)

router
.route("/create")
.post(createTask)

router
.route("/:id")
.get(getTaskById)
.put(updateTask)
.delete(deleteTask)

export default router
import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
)

export const Task = mongoose.model('Task', taskSchema)
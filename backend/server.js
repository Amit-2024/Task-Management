import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import path from "path"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())

// routes import
import taskRouter from "./routes/task.routes.js"


// routes declaration
app.use("/api/v1/tasks", taskRouter)

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
console.log(__dirname);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
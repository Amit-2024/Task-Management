import { useState } from "react"
import { useTaskContext } from "../context/TaskContext"
import toast from "react-hot-toast"
import checkInputErrors from "../utils/checkInputErrors"

const useEditTask = () => {
    const [ loading, setLoading ] = useState(false)
    const { setTasks } = useTaskContext()

    const editTask = async ({ title, description, dueDate, id }) => {
        try {
            setLoading(true)
            const success = checkInputErrors({ title, description, dueDate })
            if(!success){
                toast.error("All fields are required")
                return
            }

            const res = await fetch(`/api/v1/tasks/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, description, dueDate })
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }

            if(data.success){
                toast.success(data.success)
            }

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                  task._id === id ? { ...task, title, description, dueDate, updatedAt: data.updatedAt } : task
                )
            );

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    } 


    return { loading, editTask }
}

export default useEditTask

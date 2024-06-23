import { useState } from "react"
import { useTaskContext } from "../context/TaskContext"
import toast from "react-hot-toast"
import checkInputErrors from "../utils/checkInputErrors"

const useAddTask = () => {
    const [ loading, setLoading ] = useState(false)
    const { tasks, setTasks } = useTaskContext()

    const addTask = async ({ title, description, dueDate }) => {
        setLoading(true)
        try {
            const success = checkInputErrors({ title, description, dueDate })
            if(!success){
                toast.error("All fields are required")
                return
            }

            const res = await fetch("/api/v1/tasks/create", {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({ title, description, dueDate })
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }

            if(data.success){
                toast.success(data.success)
            }

            setTasks([...tasks, data.data])

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, addTask }
}

export default useAddTask
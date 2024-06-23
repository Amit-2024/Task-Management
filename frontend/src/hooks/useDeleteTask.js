import toast from "react-hot-toast"
import { useTaskContext } from "../context/TaskContext"

const useDeleteTask = () => {
    const { setTasks } = useTaskContext()

    const deleteTask = async (id) => {
        try {
            const success = confirm("Do you want to delete task")
            if(!success) return

            let res = await fetch(`/api/v1/tasks/${id}`, {
                method: "DELETE"
            })

            let data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }

            if(data.success){
                toast.success(data.success)
            }

            res = await fetch("/api/v1/tasks/")
            
            data = await res.json()
            
            if(data.error){
                throw new Error(data.error)
            }
            setTasks(data.data)

        } catch (error) {
            toast.error(error.message)
        }
    }

    return { deleteTask }
}

export default useDeleteTask

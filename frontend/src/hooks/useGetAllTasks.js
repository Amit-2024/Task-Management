import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useTaskContext } from "../context/TaskContext"

const useGetAllTAsks = () => {
    const [ loading, setLoading ] = useState(false)
    const { tasks, setTasks } = useTaskContext()

    useEffect(() => {
        setLoading(true)
        const getTasks = async () => {
            try {
                const res = await fetch("/api/v1/tasks/")
                const data = await res.json()
                
                if(data.error){
                    throw new Error(data.error)
                }

                setTasks(data.data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getTasks()
    }, [ setTasks ])

    return { loading, tasks }
}

export default useGetAllTAsks
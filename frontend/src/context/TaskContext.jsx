import { createContext, useContext, useState } from "react";

export const TaskContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
    return useContext(TaskContext)
}

export const TaskContextProvider = ({children}) => {

    const [ tasks, setTasks ] = useState(null)

    return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>
}
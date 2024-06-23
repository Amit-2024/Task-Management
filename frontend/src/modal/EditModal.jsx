import { useState } from "react"
import useEditTask from "../hooks/useEditTask"
import getFormattedDate from "../utils/getFormattedDate"

const EditModal = ({ task, onClose }) => {

    const [ input, setInput ] = useState({
        title: task.title,
        description: task.description,
        dueDate: getFormattedDate(task.dueDate)
    })

    const { loading, editTask } = useEditTask()

    const handleSubmit = async (e) => {
        e.preventDefault()
        input.id = task._id
        await editTask(input)
        onClose()
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={input.title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setInput({...input, title: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={input.description}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setInput({...input, description: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                        Due Date
                    </label>
                    <input
                        id="dueDate"
                        type="date"
                        value={input.dueDate}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setInput({...input, dueDate: e.target.value})}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? <span>loading...</span> : "Edit Task"}
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
    </div>
  )
}

export default EditModal

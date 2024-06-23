import { useState } from 'react';
import useAddTask from '../hooks/useAddTask';
import toast from 'react-hot-toast';

const AddTask = () => {
    const [ input, setInput ] = useState({
        title: "",
        description: "",
        dueDate: ""
    })

    const { loading, addTask } =  useAddTask()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(input)
        input.title = "",
        input.description = ""
        input.dueDate = ""
    };

    const handleDueDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0];

        // Check if selectedDate is a future date
        if (selectedDate < today) {
            toast.error("Please select a future date.");
            return;
        }

        setInput({ ...input, dueDate: selectedDate });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={input.title}
                        onChange={(e) => setInput({...input, title: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        onChange={(e) => setInput({...input, description: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        onChange={handleDueDateChange} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? <span>loading...</span> : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
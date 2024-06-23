import useDeleteTask from "../hooks/useDeleteTask";
import getFormattedDate from "../utils/getFormattedDate";

const Task = ({ task, onEdit }) => {

  const { deleteTask } = useDeleteTask()

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className="text-gray-500 text-sm">Due Date: {getFormattedDate(task.dueDate)}</p>
      </div>
      <div className="bg-gray-100 px-6 py-4 flex justify-end items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={onEdit}
        >
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteTask(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;

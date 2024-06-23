import { useState } from "react";
import Task from "./Task";
import EditModal from './../modal/EditModal';

const TaskList = ({ tasks }) => {
  const [editModal, setEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setEditModal(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Task key={task._id} task={task} onEdit={() => openEditModal(task)} />
        ))}
      </div>

      {/* Edit Modal */}
      {editModal && selectedTask && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-8 max-w-md w-full z-50">
            <EditModal task={selectedTask} onClose={closeEditModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

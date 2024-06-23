import useGetAllTasks from "./hooks/useGetAllTasks";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  const { loading, tasks } = useGetAllTasks();

  return (
    <div className="min-h-screen bg-slate-600 flex flex-col items-center py-10 px-4 md:px-8">
      <div className="w-full max-w-2xl mb-8 flex justify-center">
        <AddTask />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center justify-center">
        {loading && (
          <div className="text-center text-white">
            <span className="text-4xl">Loading...</span>
          </div>
        )}

        {!loading && tasks && tasks.length > 0 && (
            <TaskList tasks={tasks}/>
        )}

        {!loading && tasks && tasks.length <= 0 && (
          <div className="text-center text-white">
            <span className="text-green-500 text-4xl">No tasks found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

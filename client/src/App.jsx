import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTask(id);
    fetchTasks();
  };

  const handleEdit = async (task) => {
    const newTitle = prompt(
      "Enter updated title",
      task.title
    );

    if (!newTitle) return;

    await updateTask(task.id, {
      ...task,
      title: newTitle,
    });

    fetchTasks();
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-5xl mx-auto p-6">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-700">
            Personal Task Manager
          </h1>

          <p className="text-gray-600 mt-2">
            Organize your work and stay productive
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <TaskForm onAdd={handleAddTask} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold">
              {tasks.length}
            </p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Completed
            </h3>
            <p className="text-3xl font-bold">
              {tasks.filter((t) => t.completed).length}
            </p>
          </div>

          <div className="bg-orange-500 text-white p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">
              Active
            </h3>
            <p className="text-3xl font-bold">
              {tasks.filter((t) => !t.completed).length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setFilter("all")}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Active
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Completed
          </button>
        </div>

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold">
              No Tasks Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create a task to get started.
            </p>
          </div>
        )}

        <div className="grid gap-4">
          {filteredTasks.map((task) => {
            const isOverdue =
              task.dueDate &&
              !task.completed &&
              new Date(task.dueDate) < new Date();

            return (
              <div
                key={task.id}
                className={`rounded-xl shadow-lg p-5 hover:shadow-2xl transition ${
                  isOverdue
                    ? "bg-red-50 border-2 border-red-500"
                    : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {task.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {task.description}
                </p>

                <div className="flex justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Due: {task.dueDate || "No Due Date"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      task.completed
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {task.completed
                      ? "Completed"
                      : "Active"}
                  </span>
                </div>

                {isOverdue && (
                  <p className="text-red-600 font-semibold mt-3">
                    ⚠ Overdue Task
                  </p>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      handleToggle(task.id)
                    }
                    className={`px-4 py-2 rounded-lg text-white ${
                      task.completed
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.completed
                      ? "Mark Active"
                      : "Mark Complete"}
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(task)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
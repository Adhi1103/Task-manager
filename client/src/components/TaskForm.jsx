import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onAdd({
      title,
      description,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="space-y-4"
>
  <input
    type="text"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <button
    type="submit"
    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
  >
    Add Task
  </button>
</form>
    );
}

export default TaskForm;
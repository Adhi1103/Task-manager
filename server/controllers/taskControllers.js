const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/tasks.json");

const getTasks = (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(filePath));
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const tasks = JSON.parse(fs.readFileSync(filePath));

  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date(),
  };

  tasks.unshift(newTask);

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  res.status(201).json(newTask);
};


const updateTask = (req, res) => {
  const { id } = req.params;
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
  };

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  res.json(tasks[index]);
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const filteredTasks = tasks.filter(task => task.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(filteredTasks, null, 2));

  res.json({ message: "Task deleted" });
};

const toggleTask = (req, res) => {
  const { id } = req.params;

  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  res.json(task);
};


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
};
import axios from "axios";

const API_URL = "https://task-manager-688r.onrender.com";

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) =>
  axios.post(API_URL, task);

export const updateTask = (id, task) =>
  axios.put(`${API_URL}/${id}`, task);

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const toggleTask = (id) =>
  axios.patch(`${API_URL}/${id}/toggle`);

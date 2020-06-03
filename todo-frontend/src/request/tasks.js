import ky from "ky";

export async function getTasks() {
  return await ky.get("/api/tasks/").json();
}

export async function createTask(newTask) {
  return await ky.post("/api/tasks/", { json: newTask }).json();
}

export async function updateTask(taskId, data) {
  return await ky.patch(`/api/tasks/${taskId}/`, { json: data }).json();
}

export async function deleteTask(taskId) {
  return await ky.delete(`/api/tasks/${taskId}/`).json();
}

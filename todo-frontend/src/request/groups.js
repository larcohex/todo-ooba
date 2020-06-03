import ky from "ky";

export async function getGroups() {
  return await ky.get("/api/groups/").json();
}

export async function createGroup(newGroup) {
  return await ky.post("/api/groups/", { json: newGroup }).json();
}

export async function updateGroup(groupId, data) {
  return await ky.patch(`/api/groups/${groupId}/`, { json: data }).json();
}

export async function deleteGroup(groupId) {
  return await ky.delete(`/api/groups/${groupId}/`).json();
}

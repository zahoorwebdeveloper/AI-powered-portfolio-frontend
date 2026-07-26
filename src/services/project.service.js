import api from "../lib/axios.js";

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const createProject = async (formData) => {
  const { data } = await api.post("/projects", formData);
  return data;
};

export const updateProject = async ({ id, formData }) => {
  const { data } = await api.put(`/project/${id}`, formData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/project/${id}`);
  return data;
};
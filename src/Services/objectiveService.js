
import {API} from './webpageInstance';

export const getObjectives = async () => {
  return await API.get("/objectives");
};

export const addObjective = async (objective) => {
  return await API.post("/objectives", objective);
};

export const getObjectiveById = async (id) => {
  return await API.get(`/objectives/${id}`);
};

export const updateObjective= async(objective) => {
  return await API.put(`/objectives/${objective.id}`, objective)
};

export const deleteObjective= async(objective) => {
  return await API.delete(`/objectives/${objective.id}`)
};
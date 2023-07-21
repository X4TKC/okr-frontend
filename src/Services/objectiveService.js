
import {API} from './webpageInstance';

export const getObjectives = async (id) => {
  return await API.get(`/Objective/getAllFrom?id=${id}`);
};

export const addObjective = async (objective) => {
  return await API.post("/Objective/create", objective);
};

export const getObjectiveById = async (id) => {
  return await API.get(`/Objective/get?id=${id}`);
};

export const updateObjective= async(objective) => {
  return await API.put(`/Objective/update`, objective)
};

export const deleteObjective= async(id) => {
  return await API.delete(`/Objective/delete?id=${id}`)
};
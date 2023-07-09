
import {API} from './webpageInstance';

export const getActions = async () => {
  return await API.get("/action");
};

export const AddAction = async (action) => {
  return await API.post("/action", action);
};

export const getActiontById = async (id) => {
  return await API.get(`/action/${id}`);
};

export const updateAction= async(action) => {
  return await API.put(`/action/${action.id}`, action)
};

export const deleteAction= async(action) => {
  return await API.delete(`/action/${action.id}`)
};
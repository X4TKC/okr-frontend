
import {API} from './webpageInstance';

export const getActions = async () => {
  return await API.get("/action");
};

export const AddAction = async (action) => {
  return await API.post("/Action/create", action);
};

export const getActiontById = async (id) => {
  return await API.get(`Action/get?id=${id}`);
};

export const updateAction= async(action) => {
  return await API.put("/Action/update", action)
};

export const deleteAction= async(action) => {
  return await API.delete(`/Action/delete?id=${action.id}`)
};
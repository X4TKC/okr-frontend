
import {API} from './webpageInstance';

export const getKeys = async (id) => {
  return await API.get(`/KeyResult/getAllFrom?id=${id}`);
};

export const AddKey = async (key) => {
  return await API.post("/KeyResult/create",key);
};

export const getKeytById = async (id) => {
  return await API.get(`/KeyResult/get?id=${id}`);
};

export const updateKey= async(key) => {
  return await API.put('/KeyResult/update', key)
};

export const deleteKey= async(id) => {
  return await API.delete(`/KeyResult/delete?id=${id}`)
};
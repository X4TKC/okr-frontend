
import {API} from './webpageInstance';

export const getKeys = async () => {
  return await API.get("/key");
};

export const AddKey = async (key) => {
  return await API.post("/key", key);
};

export const getKeytById = async (id) => {
  return await API.get(`/key/${id}`);
};

export const updateKey= async(key) => {
  return await API.put(`/key/${key.id}`, key)
};

export const deleteKey= async(key) => {
  return await API.delete(`/key/${key.id}`)
};
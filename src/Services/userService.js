
import {API} from './webpageInstance';

export const getUsers = async () => {
  return await API.get("/user");
};

export const addUser = async (user) => {
  return await API.post("/user", user);
};

export const getUserById = async (id) => {
  return await API.get(`/user/${id}`);
};

export const updateUser= async(user) => {
  return await API.put(`/user/${user.id}`, user)
};

export const deleteUser= async(user) => {
  return await API.delete(`/user/${user.id}`)
};
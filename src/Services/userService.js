
import axios from 'axios';
import {API} from './webpageInstance';
import { getBaseAxiosInstance } from '../Utils/apiFactory';

export const getUsers = async () => {
  return await API.get("/User");
};

export const addUser = async (user) => {
  return await API.post("/User", user);
};

export const getUserById = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/api/User/get?id=user_1" );
    //  console.log(response.data,"getUser response aaa")
      return response.data;
    } catch (err) {
      console.log(err, "err");
    }
    
};
/*
export const getUserById = async (id) => {
  return await API.get("/User/get?id=user_1");
};*/

export const updateUser= async(user) => {
  return await API.put(`/user/${user.id}`, user)
};

export const deleteUser= async(user) => {
  return await API.delete(`/user/${user.id}`)
};
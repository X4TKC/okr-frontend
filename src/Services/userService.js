
import axios from 'axios';
import {API} from './webpageInstance';
import { getBaseAxiosInstance } from '../Utils/apiFactory';

export const getUsers = async () => {
  return await API.get("/User");
};

export const addUser = async (user) => {
  return await API.post("/User/create", user);
};

export const getUserById = async (id) => {
    try {
      const response = await axios.get("https://okr-backend-service.onrender.com/api/User/get?id="+id );
      //const response = await axios.get("http://localhost:8080/api/User/get?id="+id );
      return response.data;
    } catch (err) {
      console.log(err, "err");
    }
    
};
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get("https://okr-backend-service.onrender.com/api/User/getByEmail?email="+email );
    //const response = await axios.get("http://localhost:8080/api/User/getByEmail?email="+email );
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
import axios from 'axios';
//const BASE_URL = "https://okr-backend-service.onrender.com/api/";
const BASE_URL = "http://localhost:8080/api/";  // TODO Environment

export const API = axios.create(
    {
        baseURL: BASE_URL,

    }
)
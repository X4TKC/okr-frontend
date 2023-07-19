import axios from 'axios';
const BASE_URL = "https://okr-backend-service.onrender.com/api/";  // TODO Environment

export const API = axios.create(
    {
        baseURL: BASE_URL,

    }
)
import axios from 'axios';
const BASE_URL = "http://localhost:3000";  // TODO Environment

export const API = axios.create(
    {
        baseURL: BASE_URL,

    }
)
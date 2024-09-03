import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://shopit-api-1.onrender.com' 
        : 'http://localhost:4000',
});

export default axiosInstance;

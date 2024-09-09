// // axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: `http://localhost:4000`,
// 	headers: {
// 		"Content-Type": "application/json",
// 		// Add any other headers or configurations you need
// 	},
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		// You can modify the request config here, e.g., add authentication headers
// 		// config.headers.Authorization = `Bearer ${getToken()}`;
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			if (!token) {
// 				return config;
// 			}

// 			const requestConfig = {
// 				...config,
// 				headers: { ...config.headers, Authorization: `${token}` },
// 			};
//       return requestConfig
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
// 	(response) => 
// 		response,
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );

// export default axiosInstance;


import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

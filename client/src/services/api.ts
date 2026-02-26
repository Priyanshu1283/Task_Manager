import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Required for HTTP-only cookies
});

// Add a response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        return Promise.reject(message);
    }
);

export default api;

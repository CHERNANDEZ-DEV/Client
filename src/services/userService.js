import axios from 'axios';
import { getToken, setToken } from './authService';

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//trabajarlo junto con el usercontext o el login,
export const authenticateWithGoogle = async (googleUser) => {
    try {
        const response = await axiosInstance.post('/auth/google', googleUser);
        if (response.data.token) {
            setToken(response.data.token);
            localStorage.setItem('role', response.data.role); // almacenar el rol en local storage
            localStorage.setItem('picture', response.data.picture); // almacenar la imagen en local storage
            localStorage.setItem('houseNumber', response.data.houseNumber); // almacenar el número de casa en local storage
        }
        return response.data;
    } catch (error) {
        console.error('Error authenticating with Google:', error);
        throw error;
    }
};

export default {
    authenticateWithGoogle,
};
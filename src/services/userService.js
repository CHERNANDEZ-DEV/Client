import axiosInstance from './api';
import { setToken } from './authService';
//get token

export const registerUser = async (registerInfo) => {
    try {
        const response = await axiosInstance.post('/auth/register', registerInfo);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (loginInfo) => {
    try {
        const response = await axiosInstance.post('/auth/login', loginInfo);
        if (response.data.token) {
            setToken(response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('picture', response.data.picture);
            localStorage.setItem('houseNumber', response.data.houseNumber);
        }
        return response.data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};

export const checkUserExists = async (identifier) => {
    try {
        const response = await axiosInstance.get(`/auth/exists/${identifier}`);
        return response.data;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
};

export const getUserRoleCode = async () => {
    try {
        const response = await axiosInstance.get('/user/get-role-code');
        return response.data;  // Suponiendo que la respuesta contiene solo el código del rol
    } catch (error) {
        console.error('Error getting user role code:', error);
        throw error;
    }
};

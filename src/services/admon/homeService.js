import axiosInstance from '../api';
import { getToken } from '../authService';

const API_URL = 'http://localhost:8080/home';

export const assignUserToHome = async (identifier, numHome) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/assign`, null, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            params: { identifier, numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllHomes = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/list`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getResidentsByHome = async (numHome) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/residents`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            params: { numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeUserRole = async (userId, newRole, numHome) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/changeRole`, null, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            params: { userId, newRole, numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

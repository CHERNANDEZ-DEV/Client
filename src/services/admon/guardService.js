import axios from 'axios';
import { getToken } from '../authService';

const API_URL = 'http://localhost:8080/api/guards';

const getUserByEmail = async (email) => {
    const token = getToken();
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const assignGuardRole = async (email) => {
    const token = getToken();
    try {
        const response = await axios.post(`${API_URL}/assign`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getGuards = async () => {
    const token = getToken();
    try {
        const response = await axios.get(`${API_URL}/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const removeGuardRole = async (userId) => {
    const token = getToken();
    try {
        const response = await axios.post(`${API_URL}/remove`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { userId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getUserByEmail,
    assignGuardRole,
    getGuards,
    removeGuardRole
};

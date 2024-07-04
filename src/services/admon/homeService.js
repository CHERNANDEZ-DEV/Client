import axios from 'axios';
import { getToken } from '../authService';

const API_URL = 'http://localhost:8080/home';

const assignUserToHome = async (identifier, numHome) => {   //asignar numero de casa
    const token = getToken();
    try {
        const response = await axios.post(`${API_URL}/assign`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { identifier, numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getAllHomes = async () => {   //traer todos los hogares
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

const getResidentsByHome = async (numHome) => { //traer por numero de casa, todos los ue estan en esa casa
    const token = getToken();
    try {
        const response = await axios.get(`${API_URL}/residents`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: { numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const changeUserRole = async (userId, newRole, numHome) => { //cambiar rol
    const token = getToken();
    try {
        const response = await axios.post(`${API_URL}/changeRole`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { userId, newRole, numHome }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    assignUserToHome,
    getAllHomes,
    getResidentsByHome,
    changeUserRole
};

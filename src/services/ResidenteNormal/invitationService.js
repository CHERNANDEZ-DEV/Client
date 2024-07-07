import axios from 'axios';

const BASE_URL = 'http://localhost:8080/invitation/add';
const UNIQUE_API_URL = `${BASE_URL}/unique`;
const MULTIPLE_API_URL = `${BASE_URL}/multiple`;

export const sendInvitation = async (data) => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await axios.post(UNIQUE_API_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendMultipleInvitation = async (data) => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await axios.post(MULTIPLE_API_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

import axiosInstance from '../api';

const API_URL = '/api/guards';

export const assignGuardRole = async (email) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/assign`, null, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGuards = async () => {     
    try {
        const response = await axiosInstance.get(`${API_URL}/list`);
        const guards = response.data;

        // Verificar que guards es un array y tiene datos antes de intentar filtrar
        if (Array.isArray(guards)) {
            const guardsWithRole = guards.filter(guard => {
                // Verificar que roles es un array antes de intentar usar some
                return Array.isArray(guard.roles) && guard.roles.some(role => role === 'Guardia');
            });

            return guardsWithRole;
        }

        // Si guards no es un array, devolver un array vacío
        return [];
    } catch (error) {
        throw error;
    }
};

export const removeGuardRole = async (userId) => { 
    try {
        const response = await axiosInstance.post(`${API_URL}/remove`, null, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

import React, { useEffect, useState } from 'react';
import { usePopup } from "../../components/PopupContext";
import { sendInvitation } from "../../services/ResidenteNormal/invitationService";
import axios from 'axios';

const SolicitudUnica = () => {
    const { showPopup } = usePopup();
    const [formValues, setFormValues] = useState({
        email: '',
        date: '',
        time: ''
    });
    const [home, setHome] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileResponse = await axios.get('http://localhost:8080/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                const userHome = profileResponse.data.home;
                if (userHome) {
                    setHome(userHome);
                    localStorage.setItem('houseNumber', userHome);  // Guardar el número de casa en localStorage
                } else {
                    throw new Error('User home not found');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error al cargar el perfil del usuario. Inténtalo de nuevo más tarde.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const houseNumber = localStorage.getItem('houseNumber');
        const requestData = {
            house_number: houseNumber,
            user_identifier: formValues.email,
            request: true,  // para que solicite revision por parte del encargado
            initial_dates: [`${formValues.date}T${formValues.time}:00`],
            final_dates: [`${formValues.date}T${formValues.time}:00`]
        };

        try {
            const response = await sendInvitation(requestData);
            console.log('Formulario enviado:', response);
            showPopup("Solicitud enviada exitosamente", true);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            showPopup("Error al enviar la solicitud", false);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        showPopup("Solicitud cancelada", false);
    };

    return (
        <div className="flex items-center h-screen flex-col w-full font-roboto_mono">
            <h1 className="text-2xl text-[#6185A9] text-center pt-4 pb-1">Detalles de la solicitud</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-4 mb-4 width-auto">
                    <label className="text-xl mb-2">Correo electrónico:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Correo electrónico"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.email} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="flex flex-col mt-4 mb-4">
                    <label className="text-xl mb-2">Fecha de visita:</label>
                    <input 
                        type="date" 
                        name="date" 
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.date} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="flex flex-col mt-4 mb-8">
                    <label className="text-xl mb-2">Hora de llegada:</label>
                    <input 
                        type="time" 
                        name="time" 
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.time} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="flex flex-row pt-2">
                    <div className="p-4 mr-4 rounded-lg bg-[#F8BD0D] bg-opacity-70">
                        <button type="submit">Aceptar</button>
                    </div>
                    <div className="p-4 rounded-lg bg-[#F79E9E]">
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SolicitudUnica;

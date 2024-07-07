import React, { useState, useEffect } from 'react';
import TableGuards from '../../components/TableGuards';
import { assignGuardRole, getGuards, removeGuardRole } from '../../services/admon/guardService';
import { usePopup } from "../../components/PopupContext";

const Guards = () => {
    const [guards, setGuards] = useState([]);
    const [email, setEmail] = useState('');
    const { showPopup } = usePopup();

    useEffect(() => {
        fetchGuards();
    }, []);

    const fetchGuards = async () => {
        try {
            const data = await getGuards();
            setGuards(data);
        } catch (error) {
            console.error("Error fetching guards:", error);
            setGuards([]);
        }
    };

    const handleAddGuard = async () => {
        if (email) {
            try {
                const result = await assignGuardRole(email);
                if (result === "Guardia ya asignado") {
                    showPopup("Usuario ya asignado como guardia.", true);
                } else {
                    fetchGuards();
                    showPopup("Guardia registrado exitosamente!", true);
                }
                setEmail('');
            } catch (error) {
                showPopup("Error: " + (error.response ? error.response.data : error.message), false);
            }
        } else {
            showPopup("Ingrese correo válido.", false);
        }
    };

    const handleRemoveRole = async (userId) => {
        try {
            await removeGuardRole(userId);
            fetchGuards();
            showPopup("Guardia removido exitosamente!", true);
        } catch (error) {
            console.error("Error removing guard role:", error);
            showPopup("Error: " + (error.response ? error.response.data : error.message), false);
        }
    };

    const columnas = [
        { Header: 'Nombre', accessor: 'username' },
        { Header: 'Correo electrónico', accessor: 'email' },
        { Header: 'Documento', accessor: 'dui' },
        {
            Header: 'Acciones',
            Cell: ({ row }) => (
                <button
                    className="bg-red-300 py-1 px-3 rounded-md font-roboto_mono"
                    onClick={() => handleRemoveRole(row.original.userId)}
                >
                    Quitar rol
                </button>
            )
        }
    ];

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className="text-2xl font-bold text-center text-azul-principal m-3 font-roboto_mono">Agregar Vigilante</h1>
            <div className='flex flex-col mt-2 w-[150px] sm:w-[332px]'>
                <label htmlFor="email" className='text-base m-2 font-roboto_mono'>Correo electrónico:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Ingrese el correo electrónico"
                    className='border border-gray-300 p-2 rounded-md'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className='bg-amarillo-principal text-black m-2 w-20 py-2 rounded-md font-roboto_mono'
                    onClick={handleAddGuard}
                >
                    Agregar
                </button>
            </div>
            <h1 className="text-2xl font-bold text-center text-azul-principal m-3 font-roboto_mono mt-5 mb-1">Lista de vigilantes</h1>
            <TableGuards
                columnas={columnas}
                datos={guards}
                handleEliminar={handleRemoveRole}
            />
        </div>
    );
};

export default Guards;

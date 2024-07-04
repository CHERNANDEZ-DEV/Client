// src/pages/admon/History.jsx
import React, { useState, useEffect } from "react";
import Table2 from "../../components/Table2";
import FilterMenu from "../../components/FilterMenu";
import Charts from "../../components/Charts";

const History = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [invitations, setInvitations] = useState([]);

    // Simulación de obtención de datos desde una base de datos
    const fetchData = async () => {
        const data = await new Promise((resolve) =>
            setTimeout(() =>
                resolve([
                    { Casa: '100', Correo_electronico: 'holamundo@gmail.com', Documento: '--------', Motivo: 'Visita', Fecha: '2024-04-27', Hora: '1:00 p.m' },
                    { Casa: '101', Correo_electronico: 'holamundo@gmail.com', Documento: '00975677-2', Motivo: 'Entrega', Fecha: '2024-04-28', Hora: '2:00 p.m' },
                    { Casa: '102', Correo_electronico: 'holamundo@gmail.com', Documento: '00975677-2', Motivo: 'Servicio', Fecha: '2024-04-29', Hora: '3:00 p.m' },
                    { Casa: '103', Correo_electronico: 'holamundo@gmail.com', Documento: '00975677-2', Motivo: 'Visita', Fecha: '2024-04-27', Hora: '4:00 p.m' },
                ]), 1000)
        );
        setInvitations(data);
        setFilteredData(data); // Inicialmente muestra todos los datos
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filterResults = (filterType, selectedDate = '') => {
        let filtered = [];

        switch (filterType) {
            case 'all':
                filtered = invitations;
                break;
            case 'casa':
                // Filtra por casa (puedes ajustar el valor de la casa según necesites)
                filtered = invitations.filter(invitation => invitation.Casa === '100');
                break;
            case 'motivo':
                // Filtra por motivo (puedes ajustar el valor del motivo según necesites)
                filtered = invitations.filter(invitation => invitation.Motivo === 'Visita');
                break;
            case 'fecha':
                // Filtra por fecha (utiliza el valor seleccionado del filtro)
                if (selectedDate) {
                    filtered = invitations.filter(invitation => invitation.Fecha === selectedDate);
                } else {
                    filtered = invitations;
                }
                break;
            default:
                filtered = invitations;
                break;
        }

        setFilteredData(filtered);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className="text-2xl font-bold text-center text-azul-principal m-3 font-roboto_mono">Listado de Entradas</h1>
            <div className='flex flex-col items-center w-full'>
                <div className='flex justify-between items-center w-full max-w-4xl mb-4'>
                    <label htmlFor="houseNumber" className='text-base font-roboto_mono'>Últimas visitas registradas:</label>
                    <FilterMenu filterResults={filterResults} />
                </div>
                <Table2 data={filteredData} />
                <Charts data={filteredData} />
            </div>
        </div>
    );
};

export default History;

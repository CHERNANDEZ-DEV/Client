// src/pages/ViewVisits.jsx
import React, { useState } from 'react';
import VisitCard from '../../components/VisitCard';

const ViewVisits = () => {
    const [visits] = useState([
        { id: 1, nombre: 'Carlos Sosa', fecha: '2024-11-24', hora: '11:20 AM' },
        { id: 2, nombre: 'María Perez', fecha: '2024-11-20', hora: '02:30 PM' },
        { id: 2, nombre: 'María Perez', fecha: '2024-11-20', hora: '02:30 PM' },
        { id: 2, nombre: 'María Perez', fecha: '2024-11-20', hora: '02:30 PM' },
        { id: 2, nombre: 'María Perez', fecha: '2024-11-20', hora: '02:30 PM' },


        // Agregar más datos de visita según sea necesario
    ]);
    const [filtro, setFiltro] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const handleFilterChange = (filterType) => {
        setSelectedFilter(filterType);
        setMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    const applyFilter = () => {
        const currentDate = new Date();
        let filteredVisits = visits;

        switch (selectedFilter) {
            case 'last10':
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(currentDate.getDate() - 10);
                filteredVisits = visits.filter(visit => new Date(visit.fecha) >= tenDaysAgo);
                break;
            case 'month':
                const currentMonth = new Date().getMonth();
                filteredVisits = visits.filter(visit => new Date(visit.fecha).getMonth() === currentMonth);
                break;
            case 'name':
                filteredVisits = visits.filter(visit =>
                    visit.nombre.toLowerCase().includes(filtro.toLowerCase())
                );
                break;
            default:
                filteredVisits = visits;
                break;
        }

        return filteredVisits;
    };

    const filteredVisits = applyFilter();

    return (
        <div className='flex items-center flex-col w-full font-roboto_mono'>
            <h1 className="text-2xl text-[#6185A9] text-center mt-4">Registro de visitas</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full mt-4">
                <h2 className="text-xl text-[#6185A9] text-center">Últimas visitas registradas</h2>
                <div className="relative ml-4 sm:ml-10">
                    <button
                        type="button"
                        className="bg-amarillo-principal text-black py-1 px-4 rounded-md text-sm font-roboto_mono"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        Filtrar resultados
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                            <div className="py-1">
                                <button
                                    onClick={() => handleFilterChange('last10')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Últimos 10 días
                                </button>
                                <button
                                    onClick={() => handleFilterChange('month')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Mes actual
                                </button>
                                <button
                                    onClick={() => handleFilterChange('name')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Por nombre
                                </button>
                                <input
                                    type="text"
                                    placeholder="Buscar nombre"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-7 overflow-y-auto h-96 mb-8">
                {filteredVisits.length > 0 ? (
                    filteredVisits.map((visit) => (
                        <VisitCard
                            key={visit.id}
                            nombre={visit.nombre}
                            fecha={visit.fecha}
                            hora={visit.hora}
                        />
                    ))
                ) : (
                    <p className="text-gray-700 mt-4">No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};

export default ViewVisits;

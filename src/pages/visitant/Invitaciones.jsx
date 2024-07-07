import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInvitations } from '../../services/Invitado/invitadoService';

const Invitaciones = () => {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data = await getInvitations();
        const updatedData = data.map(invitation => {
          return {
            ...invitation,
            anfitrion: invitation.home || "N/A"  // Usar el campo 'home' del DTO
          };
        });
        setInvitations(updatedData);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/visits/qr/${id}`); // Navega a la ruta proporcionada con el id de la invitación
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return `${new Intl.DateTimeFormat('es-ES', options).format(start)} - ${new Intl.DateTimeFormat('es-ES', options).format(end)}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-3xl font-bold font-roboto_mono text-azul-claro">Mis invitaciones</h1>
      <div className="w-full max-w-4xl h-96 overflow-y-auto md:h-auto md:overflow-y-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invitations.map((invitation, index) => (
            invitation.dates.map((date, dateIndex) => (
              <div 
                key={`${index}-${dateIndex}`} 
                className={`w-full max-w-md p-6 ${invitation.unique_invitation ? '' : 'bg-yellow-100'} shadow-md rounded-lg`}
              >
                <div className="bg-white shadow-md rounded-lg p-4 border">
                  <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-roboto_mono mb-2" htmlFor={`anfitrion-${index}`}>
                      Casa anfitrión:
                    </label>
                    <input
                      className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`anfitrion-${index}`}
                      type="text"
                      value={invitation.anfitrion || 'N/A'}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black text-sm font-roboto_mono font-bold mb-2" htmlFor={`fecha-${index}`}>
                      Fecha programada:
                    </label>
                    <input
                      className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`fecha-${index}`}
                      type="text"
                      value={formatDateRange(date.start_datetime, date.end_datetime)}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black text-sm font-roboto_mono font-bold mb-2" htmlFor={`hora-${index}`}>
                      Hora:
                    </label>
                    <input
                      className="font-roboto_mono shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`hora-${index}`}
                      type="text"
                      value={`${formatTime(date.start_datetime)} a ${formatTime(date.end_datetime)}`}
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-amarillo-principal hover:bg-yellow-600 text-white font-roboto_mono font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleButtonClick(invitation.id)} // Pasa el id de la invitación
                    >
                      Validar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invitaciones;

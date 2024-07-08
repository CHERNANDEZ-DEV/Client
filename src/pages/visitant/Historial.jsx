import React, { useState, useEffect } from 'react';
import { getInvitationInfo } from '../../services/Invitado/invitadoService';

const Historial = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInvitationInfo();
        const formattedData = data.map(invitation => ({
          host: invitation.home,  // Aquí obtendrás el nombre del residente con rol RSDT
          date: invitation.arrivalTime.split('T')[0],
          time: invitation.arrivalTime.split('T')[1].split('.')[0] // Para remover la parte de los milisegundos
        }));
        setInvitations(formattedData);
      } catch (error) {
        console.error('Error fetching invitation info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-center text-2xl md:text-2xl lg:text-4xl font-bold font-roboto_mono text-azul-claro">Historial de invitaciones</h1>
      <div className="overflow-y-auto w-full max-w-4xl max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-amarillo-principal">
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Casa anfitrión</th>
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Fecha</th>
              <th className="px-2 py-3 text-left text-xs font-roboto_mono font-medium text-white uppercase tracking-wider md:px-6">Hora</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invitations.map((invitation, index) => (
              <tr key={index}>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.host}</td>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.date}</td>
                <td className="px-2 py-4 whitespace-nowrap font-roboto_mono text-xs md:text-base md:px-6">{invitation.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table';
import { getResidentsByHome, changeUserRole } from '../../services/admon/homeService.js';
//listo
const GestionHogar = () => {
  const { houseNumber } = useParams();
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const data = await getResidentsByHome(houseNumber);
      setResidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching residents:", error);
      setResidents([]);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    let newRole;
    switch (currentRole) {  //aqui le asignas el rol cuando le das en cambiar rol
      case 'RSNR':
        newRole = 'RSDT';
        break;
      case 'RSDT':
        newRole = 'VSTT';
        break;
      default:
        newRole = 'VSTT';
    }

    try {
      await changeUserRole(userId, newRole, houseNumber);
      fetchResidents();
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  const columnas = [
    { Header: 'Nombre', accessor: 'username' },
    { Header: 'Correo electrónico', accessor: 'email' },
    { Header: 'Documento', accessor: 'dui' },
    { Header: 'Rol', accessor: 'role' },
    {
      Header: 'Acciones',
      Cell: ({ row }) => (
        <button
          className="bg-amarillo-principal text-black py-2 px-4 rounded-md font-roboto_mono hover:bg-yellow-600 transition duration-300"
          onClick={() => handleRoleChange(row.original.code, row.original.role)}
        >
          Cambiar Rol
        </button>
      )
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-azul-claro mt-4 md:mt-8 font-roboto_mono">
        Gestión de residentes para la casa {houseNumber}
      </h1>
      
      <Table 
        columnas={columnas} 
        datos={residents} 
      />
    </div>
  );
};

export default GestionHogar;

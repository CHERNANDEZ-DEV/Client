import React, { useState } from 'react';
import { usePopup } from "../../components/PopupContext";
import { assignUserToHome } from "../../services/admon/homeService.js";
//listo
const HomeManager = () => {
  const [houseNumber, setHouseNumber] = useState('');
  const [identifier, setIdentifier] = useState('');
  const { showPopup } = usePopup();

  const handleAssignUser = async () => {
    if (houseNumber && identifier) {
      try {
        await assignUserToHome(identifier, houseNumber); // Llama al servicio correspondiente
        setHouseNumber('');
        setIdentifier('');
        showPopup("Usuario asignado al hogar exitosamente", true);
      } catch (error) {
        showPopup("Error asignando usuario al hogar: " + (error.response ? error.response.data : error.message), "error");
      }
    } else {
      showPopup("Por favor, complete ambos campos.", false);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center h-screen flex-col w-full'>
        <h1 className="text-2xl font-bold text-center text-azul-principal m-2 font-roboto_mono">Asignar usuario encargado a Hogar</h1>
        <div className='flex flex-col mt-2 w-[150px] sm:w-[332px]'>
          <label htmlFor="houseNumber" className='text-base m-2 font-roboto_mono'>Número de casa:</label>
          <input
            type="number"
            id="houseNumber"
            placeholder="Ingrese el número de casa"
            className='border border-gray-300 p-2 rounded-md'
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <label htmlFor="identifier" className='text-base m-2 font-roboto_mono'>Nombre o Correo del Usuario:</label>
          <input
            type="text"
            id="identifier"
            placeholder="Ingrese el nombre o correo electrónico del usuario"
            className="border border-gray-300 p-2 rounded-md"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button
            className='bg-amarillo-principal text-black m-2 w-20 py-2 rounded-md font-roboto_mono mt-7'
            onClick={handleAssignUser}
          >
            Asignar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeManager;

import React from "react";
import { useState, useEffect } from "react";
import { usePopup } from "../../components/PopupContext";

const UPermission = () => {

    const { showPopup } = usePopup();

    const [formValues, setFormValues] = useState({
        email: '',
        dateVisit: '',
        timeVisit: ''

    })

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario a una API
        console.log('Formulario enviado:', formValues);
        showPopup("Solicitud enviada exitosamente", true);
    }
    const handleCancel = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para cancelar el formulario
        showPopup("Solicitud cancelado", false);
    };

    return(
        <div className="flex  items-center h-screen flex-col  w-full  font-roboto_mono ">
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
                <div className=" flex flex-col mt-4 mb-4">
                <label className="text-xl mb-2">Fecha de visita:</label>
                <input 
                    type="date" 
                    name="date" 
                    className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formValues.date} 
                    onChange={handleChange} 
                />
                </div>
                <div className=" flex flex-col mt-4 mb-8">
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

export default UPermission;
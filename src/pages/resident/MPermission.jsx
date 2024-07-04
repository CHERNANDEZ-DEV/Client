import { useState } from "react";
import { usePopup } from "../../components/PopupContext";

const MPermission = () => {

    const { showPopup } = usePopup();

    const [formValues, setFormValues] = useState({
        email: '',
        dateVisit: '',
        timeVisit: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    };
    const handleCancel = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para cancelar el formulario
        showPopup("Solicitud cancelado", false);
    };

    return (
        <div className="flex  items-center h-screen flex-col  w-full  font-roboto_mono ">

            <h1 className="text-2xl text-[#6185A9] text-center m-2 ">Detalles de la solicitud</h1>
            <h2 className="text-center text-xl text-[#6185A9] pb-2">Acceso Frecuente</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col mt-4 mb-4">
                    <label className="text-lg mb-2">Correo electrónico:</label>
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
                    <label className="text-lg mb-2">Fecha inicial de visita:</label>
                    <input
                        type="date"
                        name="date1"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col mt-4 mb-4">
                    <label className="text-lg mb-2">Fecha final de visita:</label>
                    <input
                        type="date"
                        name="date2"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg mb-2">Permiso habilitado desde:</label>
                    <input
                        type="time"
                        name="time1"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.time}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col mt-4 mb-8">
                    <label className="text-lg mb-2">Hasta:</label>
                    <input
                        type="time"
                        name="time2"
                        className="border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formValues.time}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="p-2 rounded-lg bg-[#F8BD0D] bg-opacity-70 w-full md:w-1/2 lg:w-1/3 mx-2">Aceptar</button>
                    <button type="button" className="p-2 rounded-lg bg-[#F79E9E] w-full md:w-1/2 lg:w-1/3 mx-2" onClick={handleCancel} >Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default MPermission;

import { useState, useEffect } from "react";
import { usePopup } from "../../components/PopupContext";

const MPermission = () => {
    const { showPopup } = usePopup();

    const [formValues, setFormValues] = useState({
        email: '',
        date1: '',
        date2: '',
        time1: '',
        time2: ''
    });

    const [home, setHome] = useState(''); // Variable de estado para guardar el valor de home
    const [errors, setErrors] = useState({}); // Variable de estado para errores de validación

    useEffect(() => {
        const fetchUserData = async () => {
        const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

        if (!token) {
            showPopup("Token no encontrado", false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });

            if (response.ok) {
            const data = await response.json();
            console.log('Datos del usuario:', data); // Imprimir en consola la info obtenida
            setHome(data.home || ''); // Guardar el valor de home en la variable de estado
            } else {
            showPopup("Error al obtener los datos del usuario", false);
            }
        } catch (error) {
            showPopup("Error de conexión", false);
        }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value
        });
    };

    const validateForm = () => {
        const { email, date1, date2, time1, time2 } = formValues;
        let newErrors = {};

        if (!email) newErrors.email = 'El correo electrónico es obligatorio';
        if (!date1) newErrors.date1 = 'La fecha inicial es obligatoria';
        if (!date2) newErrors.date2 = 'La fecha final es obligatoria';
        if (!time1) newErrors.time1 = 'La hora inicial es obligatoria';
        if (!time2) newErrors.time2 = 'La hora final es obligatoria';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        const token = localStorage.getItem('access_token'); // Obtener el token del localStorage

        if (!token) {
        showPopup("Token no encontrado", false);
        return;
        }

        const payload = {
        house_number: home, // Usar el valor de home en el payload
        user_identifier: formValues.email,
        request: true,    //para que el encargo aprueve la solicitud
        initial_dates: [
            `${formValues.date1}T${formValues.time1}:00`,
            `${formValues.date2}T${formValues.time1}:00`
        ],
        final_dates: [
            `${formValues.date1}T${formValues.time2}:00`,
            `${formValues.date2}T${formValues.time2}:00`
        ]
        };

        try {
        const response = await fetch('http://localhost:8080/invitation/add/multiple', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Agregar el token Bearer a los encabezados
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 201) {
            showPopup("Solicitud enviada exitosamente", true);
            setFormValues({ email: '', date1: '', date2: '', time1: '', time2: '' }); // Vaciar los campos del formulario
            setErrors({}); // Limpiar los errores
        } else {
            showPopup("Error al enviar la solicitud", false);
        }
        } catch (error) {
        showPopup("Error de conexión", false);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        showPopup("Solicitud cancelada", false);
    };

    return (
        <div className="flex items-center h-screen flex-col w-full font-roboto_mono">
        <h1 className="text-2xl text-[#6185A9] text-center m-2">Detalles de la solicitud</h1>
        <h2 className="text-center text-xl text-[#6185A9] pb-2">Acceso Frecuente</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col mt-4 mb-4">
            <label className="text-lg mb-2">Correo electrónico:</label>
            <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className={`border ${errors.email ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={formValues.email}
                onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col mt-4 mb-4">
            <label className="text-lg mb-2">Fecha inicial de visita:</label>
            <input
                type="date"
                name="date1"
                className={`border ${errors.date1 ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={formValues.date1}
                onChange={handleChange}
            />
            {errors.date1 && <p className="text-red-500 text-sm">{errors.date1}</p>}
            </div>
            <div className="flex flex-col mt-4 mb-4">
            <label className="text-lg mb-2">Fecha final de visita:</label>
            <input
                type="date"
                name="date2"
                className={`border ${errors.date2 ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={formValues.date2}
                onChange={handleChange}
            />
            {errors.date2 && <p className="text-red-500 text-sm">{errors.date2}</p>}
            </div>
            <div className="flex flex-col mt-4">
            <label className="text-lg mb-2">Permiso habilitado desde:</label>
            <input
                type="time"
                name="time1"
                className={`border ${errors.time1 ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={formValues.time1}
                onChange={handleChange}
            />
            {errors.time1 && <p className="text-red-500 text-sm">{errors.time1}</p>}
            </div>
            <div className="flex flex-col mt-4 mb-8">
            <label className="text-lg mb-2">Hasta:</label>
            <input
                type="time"
                name="time2"
                className={`border ${errors.time2 ? 'border-red-500' : 'border-black'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                value={formValues.time2}
                onChange={handleChange}
            />
            {errors.time2 && <p className="text-red-500 text-sm">{errors.time2}</p>}
            </div>
            <div className="flex justify-between">
            <button
                type="submit"
                className="p-2 rounded-lg bg-[#F8BD0D] bg-opacity-70 w-full md:w-1/2 lg:w-1/3 mx-2 transition-transform duration-150 active:scale-95 hover:scale-105"
            >
                Aceptar
            </button>
            <button
                type="button"
                className="p-2 rounded-lg bg-[#F79E9E] w-full md:w-1/2 lg:w-1/3 mx-2 transition-transform duration-150 active:scale-95 hover:scale-105"
                onClick={handleCancel}
            >
                Cancelar
            </button>
            </div>
        </form>
        </div>
    );
}

export default MPermission;





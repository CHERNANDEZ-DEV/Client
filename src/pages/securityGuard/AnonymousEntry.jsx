import { useState } from "react";
import { usePopup } from "../../components/PopupContext";
import axios from 'axios';

const AnonymousEntry = () => {
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({
    identifier: '',
    motive: ''
  });
  const [isButtonVisible, setIsButtonVisible] = useState(false); // Estado para controlar la visibilidad del botón

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.identifier === "" || formData.motive === "") {
      showPopup("Campos vacíos", false);
      return;
    }

    // Obtener el token de local storage
    const token = localStorage.getItem('access_token'); 

    // Aquí se envía la petición POST a la API
    axios.post('https://securityflow.onrender.com/entry/anon-entry', {
      reason: formData.motive,
      document: formData.identifier
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          showPopup("Solicitud enviada con éxito", true);
          setIsButtonVisible(true); // Mostrar el botón al recibir una respuesta OK
          // Limpiar los campos del formulario
          setFormData({
            identifier: '',
            motive: ''
          });
        }
      })
      .catch((error) => {
        console.error(error);
        showPopup("Error al enviar la solicitud", false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendMessage = () => {
    // Obtener el token de local storage
    const token = localStorage.getItem('access_token');

    // Aquí se envía la petición GET a la API para enviar el mensaje
    axios.get('https://securityflow.onrender.com/mqtt/publish?message=open', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Mensaje enviado:', response.data);
        showPopup("Mensaje enviado con éxito", true);
        setIsButtonVisible(false); // Ocultar el botón después de hacer clic
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
        showPopup("Error al enviar el mensaje", false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 px-4 font-roboto_mono">
      <h1 className="text-3xl mb-4 text-center mt-8 text-sky-700">Crear entrada anónima</h1>
      <section className="shadow-md rounded p-6 mb-8 font-roboto_mono">
        <div className="justify-center mb-6 md:container md:mx-auto container mx-auto px-4 font-roboto_mono">
          <p className="font-bold text-center mb-4">Complete los siguientes campos</p>
          <form className="mt-5" onSubmit={submitHandler}>
            <label className="block text-gray-700 text-sm font-semibold mb-5">Identificador:</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.identifier}
              onChange={handleChange}
              name="identifier"
            />
            <label className="mt-3 block text-gray-700 text-sm font-semibold mb-5">Motivo de ingreso:</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.motive}
              onChange={handleChange}
              name="motive"
            />
            <div className="flex justify-center">
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-roboto_mono font-semibold py-2 px-4 mt-5 rounded-md w-full sm:w-auto mx-auto transition-all duration-300">
                Enviar Solicitud
              </button>
            </div>
          </form>
          {isButtonVisible && (
            <div className="flex justify-center">
              <button onClick={sendMessage} className="bg-sky-500 hover:bg-sky-600 text-black font-roboto_mono font-semibold py-2 px-4 mt-5 rounded-md w-full sm:w-auto mx-auto transition-all duration-300">
                Levantar Pluma
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AnonymousEntry;







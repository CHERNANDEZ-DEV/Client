import React, { useEffect, useState} from 'react';
import ErrImg from '../assets/error.png'
import GoodImg from '../assets/check.png'

const Popup = ({ message, isVisible, duration = 3000, onClose, type}) => {


    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          onClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [isVisible, duration, onClose]);
  
    if (!isVisible) return null;

    const setColorText = () => {
      if(type === true) {
        return "text-green-600 p-8"
      } else {
        return "text-red-600 p-8"
      }
    }

    const setImg = () =>{
      if(type === true){
        return GoodImg
      } else{
        return ErrImg
      }
    }
  
    return (
      <div className="font-roboto_mono flex flex-row items-center fixed bottom-4 right-4 bg-slate-100 rounded shadow-lg animate-bounce">
        <p className={setColorText()}>
        {message}
        </p>
        <img src={setImg()} alt={type} class="h-12 w-12 mr-8"></img>
      </div>
      
    );

    /* 
    // Como usar este Popup //
    ---- Añadir este import al componente que se quiera usar
    import { usePopup } from '(Buscar el PopupContext, esta dentro de components)'

    ---- Dentro del componente poner:
    const { showPopup } = usePopup();

    ---- Y finalmente llamar con showPopup([mensaje], [tipo, true para msg positvo, false para negativo])

    ---- EJEMPLO:
    
    import { usePopup } from "../../components/PopupContext";

    const Componente = () => {
      const { showPopup } = usePopup();

      const handleClick = () => {
        showPopup("Mensaje negativo", false)
      }

      return (
        <div>
          <button
            onClick={() => showPopup("Mensaje positivo", true)}>
            Mostrar mensaje
          </button>

          <button 
            onClick={() => handleClick()}>  
            Mostrar forma alternativa
          </button>
        </div>
      );
    };
    */
    
  };
  
  export default Popup;
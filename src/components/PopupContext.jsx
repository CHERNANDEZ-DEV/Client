import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const usePopup = () => {
  return useContext(PopupContext);
};

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({ message: '', success: false });

  const showPopup = (message, success) => {
    setPopup({ message, success });
    setTimeout(() => {
      setPopup({ message: '', success: false });
    }, 3000);
  };

  return (
    <PopupContext.Provider value={{ popup, showPopup }}>
      {children}
      {popup.message && (
        <div className={`popup ${popup.success ? 'popup-success' : 'popup-error'}`}>
          {popup.message}
        </div>
      )}
    </PopupContext.Provider>
  );
};

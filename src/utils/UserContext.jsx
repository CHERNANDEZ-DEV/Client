import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));    //lo uso para tener la info del usu en toda la app
    if (storedUser) {
        setUser(storedUser);
    }
    }, []);

return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
);
};

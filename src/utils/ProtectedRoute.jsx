import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ canActivate, requiredRole }) => {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('role');

    console.log('Verificando acceso con token:', token); // Añadir depuración
    console.log('Verificando acceso con rol:', userRole); // Añadir depuración

    if (!token || !userRole) {
        return <Navigate to="/" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    return canActivate ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

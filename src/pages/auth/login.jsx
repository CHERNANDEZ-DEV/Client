import React, { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.css';
import google from '../../assets/google.svg';
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { authenticateWithGoogle } from '../../services/userService';
import { UserContext } from '../../utils/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const nav = (role) => {
        switch (role) {
            case 'ADMN':
                return '/admon';
            case 'RSDT':
                return '/resident';
            case 'RSNR':
                return '/normal';
            case 'GRDA':
                return '/security';
            case 'VSTT':
                return '/visits';
            default:
                return '/';
        }
    }

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const token = codeResponse.access_token;
                localStorage.setItem("access_token", token);

                const userInfo = await getUserInfo(token);
                const backendResponse = await authenticateWithGoogle(userInfo);

                const role = backendResponse.role;
                const picture = backendResponse.picture;
                const houseNumber = backendResponse.houseNumber;

                const user = {
                    name: userInfo.name,
                    email: userInfo.email,
                    houseNumber: houseNumber || "No asignado",
                    picture,
                    id: backendResponse.id
                };

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", role);
                localStorage.setItem("houseNumber", houseNumber); 

                setUser(user); // Actualiza el contexto del usuario

                const path = nav(role);
                navigate(path);
            } catch (error) {
                console.error("Error during Google login process:", error);
            }
        },
        onError: (error) => console.log('Fallo al iniciar sesión', error),
    });

    const getUserInfo = async (token) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return {
            name: data.name,
            email: data.email,
            sub: data.sub,
            picture: data.picture,
        };
    }

    return (
        <div className='flex items-center justify-center h-screen flex-col lg:flex-row'>
            <div className='flex flex-col items-center justify-center w-1/2 mx-auto text-center'>
                <h1 className='font-bold text-5xl m-4'>Bienvenido</h1>
                <img src={Logo} className='w-auto h-auto' alt="Logo de la compañía"/>
                <h2 className='lg:text-2xl text-base m-4'>Acceso protegido: tu seguridad, nuestra prioridad</h2>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 lg:h-screen px-4 bg-blue-900 rounded-lg relative p-6'>
                <p className="text-white m-4 text-center">Ingresar al sistema</p>
                <button className="bg-white text-blue rounded-md py-2 px-4 flex items-center space-x-2" 
                        onClick={() => login()}>
                    <img src={google} alt="Google icon" className="h-6 w-6"></img>
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}

export default Login;

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import defaultImage from '../assets/profile.png';

const PerfilCardComp = () => {
    const { user } = useContext(UserContext);
    const [userImage, setUserImage] = useState(defaultImage);
    const [houseNumber, setHouseNumber] = useState('Casa #No asignado');

    useEffect(() => {
        if (user) {
            const picture = localStorage.getItem("picture") || user.picture || defaultImage;
            setUserImage(picture);

            const houseNum = user.houseNumber ? `Casa #${user.houseNumber}` : 'Casa #No asignado';
            setHouseNumber(houseNum);
        }
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="flex flex-col items-center bg-gray-900 w-4/5 rounded-2xl font-roboto_mono text-white p-6">
                <div className="mt-12 mb-4">
                    <img src={userImage} alt="Avatar" className="w-40 h-40 rounded-full object-cover" />
                </div>
                <p className='text-center text-3xl mb-2'>{user.name}</p>
                <p className='text-center text-base sm:text-2xl mb-2'>{user.email}</p>
                <p className='text-center text-2xl mb-2'>{user.id}</p>
                <p className='text-center text-2xl mb-2'>{houseNumber}</p>
            </div>
        </div>
    );
}

export default PerfilCardComp;

import React, { useEffect, useState } from 'react';
import { getUserRoleCode } from '../services/userService';

const UserRoleComponent = () => {
    const [roleCode, setRoleCode] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoleCode = async () => {
            try {
                const roleCode = await getUserRoleCode();
                setRoleCode(roleCode);
            } catch (error) {
                setError('Error fetching role code');
            }
        };

        fetchRoleCode();
    }, []);

    return (
        <div>
            <h1>User Role Code</h1>
            {error && <p>{error}</p>}
            <p>{roleCode}</p>
        </div>
    );
};

export default UserRoleComponent;

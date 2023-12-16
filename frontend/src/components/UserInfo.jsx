import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { responsiveFontSizes } from '@mui/material';

const UserInfo = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const authenticatedUser = JSON.parse(localStorage.getItem('user'));
            const bearerToken = authenticatedUser ? authenticatedUser.token : null;
            const response = await fetch('/react-app/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            if (!response.ok) {
                setIsAuthenticated(null); 
            } else {
                setIsAuthenticated(response.json());
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <Container>
            {isAuthenticated ? (
                <>
                    <Typography variant="body1">This is only visible to authenticated users.</Typography>
                </>
            ) : (
                <Typography variant="body1">Log in to view user info.</Typography>
            )}
        </Container>
    );
};

export default UserInfo;

import React, { useEffect, useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { AppContext } from '../Home';

const UserInfo = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

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
                setIsAuthenticated(false); 
            } else {
                setIsAuthenticated(true);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <Container>
            {isAuthenticated ? (
                <>
                    <Typography variant="body1">User is logged in.</Typography>
                </>
            ) : (
                <Typography variant="body1">Log in to view user info.</Typography>
            )}
        </Container>
    );
};

export default UserInfo;

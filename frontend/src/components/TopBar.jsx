import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TopBar() {
    // Check if user data is present in localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLoggedIn(true);
            setUserInfo(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <AppBar position="static" style={{ backgroundColor: 'hsl(0, 0%, 21%)', width: "100%"}}>
            <Toolbar>
                <Typography variant="h4">EcoScape</Typography>
                <Box sx={{ flexGrow: 1 }} />

                {isLoggedIn ? (
                    // Display user's name if logged in
                    <Typography variant="h6" style={{ marginRight: 16 }}>
                        Hello, {userInfo.firstName}.
                    </Typography>
                ) : (
                <>
                    <Link to="/signin" variant="body2">
                        <Button 
                            color="primary" 
                            variant="contained" 
                            style={{ marginRight: 8, backgroundColor: 'hsl(217, 71%, 53%)	' }}
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link to="signup" variant="body2">
                        <Button 
                            color="secondary" 
                            variant="contained" 
                            style={{ backgroundColor: 'hsl(141, 53%, 53%)' }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;

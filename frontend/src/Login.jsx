import React from 'react';
import {useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

/**
 * Login Component
 * @return {object} JSX Table
 */
export default function Login() {
  // CREDIT: https://mui.com/material-ui/getting-started/templates/
  // State variables for storing user-supplied credentials.
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useNavigate();

  // Update user credentials when form changes.
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  // Pass user credentials to login endpoint.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      // Invalid credentials.
      alert('Error logging in, please try again.');
    } else {
      // Successful login.
      const json = await response.json();
      localStorage.setItem('user', JSON.stringify(json));
      history('/');
    }
  };

  // Render login form.
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component='h1' variant='h5' >
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='username'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{'data-testid': 'password'}}
              onChange={handleInputChange}
            />
            {/* TODO: Implement logic for this! */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              name='Sign In'
              aria-label='sign in'
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

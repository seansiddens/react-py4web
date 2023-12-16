import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * Not found component.
 * @return {Object} JSX
 */
export default function NotFound() {
  return (
    <Container>
      <Typography variant='h1'>
        Page not found :(
      </Typography>
    </Container>
  );
}

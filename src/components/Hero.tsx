// src/components/Hero.tsx
import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import StyledTooltip from './StyledTooltip';
// import Image from 'next/image'; // Removed

function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px', // Adjust as needed
        // background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))', // Removed image-related gradient
        background: 'linear-gradient(to bottom,rgb(255, 21, 21),rgb(39, 39, 39))', // Example gradient
        // Alternatively, use a solid color:
        // backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, color: 'white' }}>
        <Typography variant="h1" align="center" component="h1" gutterBottom>
          DeanMachines
        </Typography>
        <Typography variant="h3" align="center" component="h2" gutterBottom>
          Discover the Future of Robotics
        </Typography>
        <Typography variant="h5" paragraph sx={{ mb: 4 }}>
          Explore our cutting-edge FPV drone projects and learn how they can revolutionize your industry.
        </Typography>
        <StyledTooltip title="View Documentation" placement="bottom">
          <Button variant="contained" color="secondary" size="large" href="/docs">
            View Documentation
          </Button>
        </StyledTooltip>
      </Container>
    </Box>
  );
}

export default Hero;
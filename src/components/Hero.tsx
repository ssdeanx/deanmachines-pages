// src/components/Hero.tsx
import React from 'react';
import { Typography, Container, Button, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import StyledTooltip from './StyledTooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Image from 'next/image'; // Removed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function Hero() {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.dark}99, 
          ${theme.palette.primary.main}99,
          ${theme.palette.secondary.main}99
        )`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/hero-pattern.svg) repeat',
          opacity: 0.1,
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle at center, transparent 0%, ${theme.palette.background.default} 70%)`,
          zIndex: 2,
        },
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            DeanMachines
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              mb: 3,
            }}
          >
            Discover the Future of Robotics
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography 
            variant="h5" 
            paragraph 
            sx={{ 
              mb: 4,
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Explore our cutting-edge FPV drone projects and learn how they can revolutionize your industry.
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StyledTooltip title="View Documentation" placement="bottom">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/docs"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              View Documentation
            </Button>
          </StyledTooltip>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Hero;
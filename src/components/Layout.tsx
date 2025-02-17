// src/components/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  toggleColorMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleColorMode }) => {
  const theme = useTheme();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.grey[900]})`
          : `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.grey[100]})`,
      }}
    >
      <Navbar toggleColorMode={toggleColorMode} />
      <Box
        component={motion.main}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 10 },
          pb: 4,
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}15, transparent)`,
            zIndex: -1,
          }
        }}
      >
        <Container 
          maxWidth="xl"
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '100vh',
              background: `radial-gradient(circle at 50% 50%, ${theme.palette.secondary.main}10, transparent)`,
              zIndex: -1,
            }
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
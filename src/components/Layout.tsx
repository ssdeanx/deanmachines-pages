// src/components/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 4}}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
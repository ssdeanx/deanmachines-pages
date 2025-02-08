// src/components/Section.tsx
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string; // Optional background color
}

const Section: React.FC<SectionProps> = ({ title, children, bgColor }) => {
  return (
    <Box sx={{ py: 4, backgroundColor: bgColor ? bgColor : 'transparent' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Section;
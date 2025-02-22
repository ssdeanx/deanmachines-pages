// pages/about.tsx (Refactored with Flexbox)
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h2" align="center" gutterBottom>
          About Dean Machines
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Pioneering the Future of Robotics
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4, // Spacing between items
        }}>
          <Paper elevation={0} sx={{
            p: 4,
            height: '100%',
            backgroundColor: 'transparent',
            flex: '1 1 300px', // Grow, shrink, and base width
          }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              [Temporary content: At Dean Machines, we're dedicated to pushing the boundaries of robotics technology. Our mission is to develop innovative solutions that transform industries and enhance human capabilities.]
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{
            p: 4,
            height: '100%',
            backgroundColor: 'transparent',
            flex: '1 1 300px', // Grow, shrink, and base width
          }}>
            <Typography variant="h4" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1">
              [Temporary content: We envision a future where advanced robotics seamlessly integrates with human society, making life easier, safer, and more efficient for everyone.]
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{
            p: 4,
            mt: 4,
            backgroundColor: 'transparent',
            flex: '1 1 100%', // Full width
          }}>
            <Typography variant="h4" gutterBottom>
              Our Expertise
            </Typography>
            <Typography variant="body1">
              [Temporary content: With years of experience in robotics engineering, machine learning, and automation, our team brings together cutting-edge technology and practical solutions to solve real-world challenges.]
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default AboutPage;
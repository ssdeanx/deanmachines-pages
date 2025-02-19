// pages/about.tsx (Correct)
import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h2" align="center" gutterBottom>
          About Dean Machines
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Pioneering the Future of Robotics
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', backgroundColor: 'transparent' }}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                [Temporary content: At Dean Machines, we're dedicated to pushing the boundaries of robotics technology. Our mission is to develop innovative solutions that transform industries and enhance human capabilities.]
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', backgroundColor: 'transparent' }}>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                [Temporary content: We envision a future where advanced robotics seamlessly integrates with human society, making life easier, safer, and more efficient for everyone.]
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, mt: 4, backgroundColor: 'transparent' }}>
              <Typography variant="h4" gutterBottom>
                Our Expertise
              </Typography>
              <Typography variant="body1" paragraph>
                [Temporary content: With years of experience in robotics engineering, machine learning, and automation, our team brings together cutting-edge technology and practical solutions to solve real-world challenges.]
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AboutPage;
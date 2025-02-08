// pages/requirements/software.tsx
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function SoftwareRequirementsPage() {
  return (
    <div>
      <title>Software Requirements</title>
      <meta name="description" content="Software Requirements for Dean Machines" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Software Requirements
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Ubuntu 20.04 (or later)" secondary="Operating System for the NVIDIA Jetson Orin Nano" />
          </ListItem>
          <ListItem>
            <ListItemText primary="NVIDIA JetPack SDK" secondary="For accessing NVIDIA hardware and libraries" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Python 3.8 (or later)" secondary="Primary programming language" />
          </ListItem>
          <ListItem>
            <ListItemText primary="ROS 2 (Robot Operating System)" secondary="Framework for robot software development" />
          </ListItem>
          <ListItem>
            <ListItemText primary="CUDA Toolkit" secondary="For GPU-accelerated computing" />
          </ListItem>
          <ListItem>
            <ListItemText primary="TensorFlow/PyTorch" secondary="For machine learning tasks" />
          </ListItem>
          <ListItem>
            <ListItemText primary="OpenCV" secondary="For computer vision tasks" />
          </ListItem>
           <ListItem>
            <ListItemText primary="Next.js" secondary="Frontend Framework" />
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default SoftwareRequirementsPage;
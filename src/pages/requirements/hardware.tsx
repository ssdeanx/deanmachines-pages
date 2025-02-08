// pages/requirements/hardware.tsx
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function HardwareRequirementsPage() {
  return (
    <div>
      <title>Hardware Requirements</title>
      <meta name="description" content="Hardware Requirements for Dean Machines" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Hardware Requirements
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="FPV Racing Drone Frame" />
          </ListItem>
          <ListItem>
            <ListItemText primary="NVIDIA Jetson Orin Nano" />
          </ListItem>
          <ListItem>
            <ListItemText primary="TFmini-S LiDAR Sensor" />
          </ListItem>
          <ListItem>
            <ListItemText primary="HD FPV Camera (>720p)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="GPS Module (uBlox NEO-M8N or better)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="IMU (MPU6050 or better)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="SDR (YHY 9800 or compatible)" />
          </ListItem>
        </List>

      </Container>
    </div>
  );
}

export default HardwareRequirementsPage;
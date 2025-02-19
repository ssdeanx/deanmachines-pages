// pages/requirements/hardware.tsx
import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SensorsIcon from '@mui/icons-material/Sensors';
import RouterIcon from '@mui/icons-material/Router';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

function HardwareRequirementsPage() {
  const requirements = [
    { title: 'FPV Racing Drone Frame', icon: <PrecisionManufacturingIcon />, description: 'Carbon fiber frame optimized for racing and agility' },
    { title: 'NVIDIA Jetson Orin Nano', icon: <MemoryIcon />, description: 'High-performance computing module for AI and robotics' },
    { title: 'TFmini-S LiDAR Sensor', icon: <SensorsIcon />, description: 'Precise distance measurement and obstacle detection' },
    { title: 'HD FPV Camera (>720p)', icon: <CameraAltIcon />, description: 'High-definition video feed for real-time navigation' },
    { title: 'GPS Module (uBlox NEO-M8N or better)', icon: <GpsFixedIcon />, description: 'Accurate positioning and navigation' },
    { title: 'IMU (MPU6050 or better)', icon: <SensorsIcon />, description: 'Motion tracking and orientation sensing' },
    { title: 'SDR (YHY 9800 or compatible)', icon: <RouterIcon />, description: 'Software-defined radio for communication' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Hardware Requirements
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Essential hardware components for Dean Machines projects
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <List>
          {requirements.map((req, index) => (
            <React.Fragment key={req.title}>
              <ListItem>
                <ListItemIcon>
                  {req.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={req.title}
                  secondary={req.description}
                  primaryTypographyProps={{
                    variant: 'h6',
                    gutterBottom: true
                  }}
                  secondaryTypographyProps={{
                    variant: 'body2'
                  }}
                />
              </ListItem>
              {index < requirements.length - 1 && <Box sx={{ mx: 2 }}><hr /></Box>}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default HardwareRequirementsPage;
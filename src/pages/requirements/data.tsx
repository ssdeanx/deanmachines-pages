// pages/requirements/data.tsx

import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SpeedIcon from '@mui/icons-material/Speed';

function DataRequirementsPage() {
  const sections = [
    {
      title: 'Data Collection Requirements',
      icon: <FlightTakeoffIcon fontSize="large" />,
      content: [
        'Minimum 10 minutes of continuous flight',
        'Various Flight Patterns Required:',
        '- Hover',
        '- Forward flight',
        '- Figure-8',
        '- Obstacle navigation'
      ]
    },
    {
      title: 'Data Format Standards',
      icon: <DataObjectIcon fontSize="large" />,
      content: [
        'Timestamp: Unix timestamp (ms)',
        'GPS: lat (number), lon (number), alt (number in meters), accuracy (number in meters)',
        'IMU: acceleration (Vec3: m/s²), gyroscope (Vec3: rad/s), magnetometer (Vec3: μT)',
        'LiDAR: distance (number in meters), strength (number)',
        'Camera: resolution (string: \'1280x720\'), fps (number), format (string: \'h264\')',
        'Radio: frequency (number in MHz), signalStrength (number in dBm), bandwidth (number in MHz)'
      ]
    },
    {
      title: 'Quality Standards',
      icon: <SpeedIcon fontSize="large" />,
      content: [
        'Camera: 720p minimum at 30fps',
        'LiDAR: 100Hz minimum sampling rate',
        'IMU: 200Hz minimum sampling rate',
        'GPS: 10Hz minimum update rate',
        'Radio: 433MHz band captures at 2MSPS'
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Data Requirements
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Data collection and quality standards for Dean Machines
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {sections.map((section) => (
          <Grid item xs={12} key={section.title}>
            <Paper sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                {section.icon}
                <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                  {section.title}
                </Typography>
              </Box>
              <Box component="ul" sx={{ 
                listStyle: 'none',
                p: 0,
                m: 0,
                '& > li': {
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                }
              }}>
                {section.content.map((item, index) => (
                  <Box component="li" key={index}>
                    <Typography
                      variant="body1"
                      sx={{
                        pl: item.startsWith('-') ? 2 : 0,
                        color: item.startsWith('-') ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DataRequirementsPage;
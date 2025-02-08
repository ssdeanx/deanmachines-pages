// pages/requirements/data.tsx

import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';


function DataRequirementsPage() {
  return (
    <div>
      <title>Data Requirements</title>
      <meta name="description" content="Data Requirements for Dean Machines" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Data Requirements
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
            Data Collection Requirements
        </Typography>
        <List>
            <ListItem>
                <ListItemText primary="Minimum 10 minutes of continuous flight"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Various Flight Patterns Required:"/>
            </ListItem>
        </List>
        <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem>
                <ListItemText primary="- Hover" />
            </ListItem>
            <ListItem>
                <ListItemText primary="- Forward flight" />
            </ListItem>
            <ListItem>
                <ListItemText primary="- Figure-8" />
            </ListItem>
            <ListItem>
                <ListItemText primary="- Obstacle navigation" />
            </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" component="h2" gutterBottom>
            Data Format Standards
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Timestamp: Unix timestamp (ms)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="GPS: lat (number), lon (number), alt (number in meters), accuracy (number in meters)" />
          </ListItem>
          <ListItem>
              <ListItemText
                primary="IMU:"
                secondary={
                  <>
                    acceleration (Vec3: m/s²), gyroscope (Vec3: rad/s), magnetometer (Vec3: μT)
                  </>
                }
              />
          </ListItem>
          <ListItem>
            <ListItemText primary="LiDAR: distance (number in meters), strength (number)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Camera: resolution (string: '1280x720'), fps (number), format (string: 'h264')" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Radio: frequency (number in MHz), signalStrength (number in dBm), bandwidth (number in MHz)" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" component="h2" gutterBottom>
            Quality Standards
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Camera: 720p minimum at 30fps" />
          </ListItem>
          <ListItem>
            <ListItemText primary="LiDAR: 100Hz minimum sampling rate" />
          </ListItem>
          <ListItem>
            <ListItemText primary="IMU: 200Hz minimum sampling rate" />
          </ListItem>
          <ListItem>
            <ListItemText primary="GPS: 10Hz minimum update rate" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Radio: 433MHz band captures at 2MSPS" />
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default DataRequirementsPage;
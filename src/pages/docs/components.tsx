// pages/docs/components.tsx

import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function ComponentsPage() {
  return (
    <div>
      <title>Components</title>
      <meta name="description" content="Documentation for Dean Machines Components" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Components
        </Typography>

        <Typography paragraph>
          This section provides documentation for the reusable components used in the Dean Machines project.
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="SensorDataDisplay" secondary="Displays sensor data in a consistent format. Supports units, different display types, and text sizes." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="DroneMap" secondary="Displays a map with the drone's location. Supports displaying a path of previous locations and different map types." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="TelemetryDisplay" secondary="Displays telemetry data. Supports a custom color for the value text." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="LidarDataDisplay" secondary="Displays lidar data as a 3D scatter plot. Includes a dropdown menu to select different color scales." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="IMUDataDisplay" secondary="Displays IMU data as a 3D scatter plot. Includes a dropdown menu to select different data types to display." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="FPVVideoDisplay" secondary="Displays a video stream from the FPV drone. Includes a loading state, error handling, and a responsive video element. The FPV page also includes an input box to allow the user to enter a video URL and save it for later use, and checkboxes for advanced options for receiving and displaying FPV video in real time." />
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default ComponentsPage;
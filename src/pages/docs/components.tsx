// pages/docs/components.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Box, Paper, Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import FlightIcon from '@mui/icons-material/Flight';
import Head from 'next/head';

const documentationSections = [
  { 
    title: 'UI Components',
    icon: <CodeIcon fontSize="large" />,
    items: [
      { text: 'Layout Components', description: 'Core layout structure components' },
      { text: 'Navigation Components', description: 'Navigation and routing components' },
      { text: 'Form Components', description: 'Input and form handling components' },
      { text: 'Display Components', description: 'Visual and display components' }
    ]
  },
  {
    title: 'Integration Components',
    icon: <GitHubIcon fontSize="large" />,
    items: [
      { text: 'Authentication Components', description: 'User authentication and authorization' },
      { text: 'API Integration Components', description: 'Backend communication components' },
      { text: 'State Management', description: 'Global state and data flow components' }
    ]
  },
  {
    title: 'Specialized Components',
    icon: <FlightIcon fontSize="large" />,
    items: [
      { text: 'Drone Control Components', description: 'FPV drone control interface components' },
      { text: 'Telemetry Components', description: 'Real-time data visualization components' },
      { text: 'Configuration Components', description: 'System configuration interface components' }
    ]
  }
];

function ComponentsPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isOpen={true} onClose={() => {}} />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'background.default' }}>
        <Head>
          <title>Components</title>
          <meta name="description" content="Documentation for Dean Machines Components" />
        </Head>

        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Components
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              Comprehensive documentation for Dean Machines components
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {documentationSections.map((section) => (
              <Grid item xs={12} key={section.title}>
                <Paper sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    {section.icon}
                    <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Box>
                    {section.items.map((item, index) => (
                      <ListItemButton
                        key={item.text}
                        component={Link}
                        href={`/docs/components/${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                        sx={{
                          borderBottom: index < section.items.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider',
                          py: 2
                        }}
                      >
                        <ListItemText
                          primary={item.text}
                          secondary={item.description}
                          primaryTypographyProps={{
                            variant: 'h6',
                            gutterBottom: true
                          }}
                          secondaryTypographyProps={{
                            variant: 'body2'
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default ComponentsPage;
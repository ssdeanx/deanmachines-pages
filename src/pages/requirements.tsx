// pages/requirements.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Box, Paper, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HardwareIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RequirementsPage() {
  const requirements = [
    {
      title: 'Hardware Requirements',
      icon: <HardwareIcon fontSize="large" />,
      path: '/requirements/hardware',
      description: 'Essential hardware components and specifications for Dean Machines projects, including FPV drone frame, sensors, and computing modules.',
      items: [
        'FPV Racing Drone Frame',
        'NVIDIA Jetson Orin Nano',
        'Sensors and Cameras'
      ]
    },
    {
      title: 'Software Requirements',
      icon: <CodeIcon fontSize="large" />,
      path: '/requirements/software',
      description: 'Required software, frameworks, and development tools for building and running Dean Machines applications.',
      items: [
        'Operating Systems',
        'Development Frameworks',
        'Libraries and SDKs'
      ]
    },
    {
      title: 'Data Requirements',
      icon: <StorageIcon fontSize="large" />,
      path: '/requirements/data',
      description: 'Data collection standards, format specifications, and quality requirements for Dean Machines operations.',
      items: [
        'Data Collection Standards',
        'Format Specifications',
        'Quality Requirements'
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Requirements
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Technical specifications and requirements for Dean Machines projects. Each section provides detailed guidelines for hardware, software, and data components.
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
      }}>
        {requirements.map((req) => (
          <Paper
            key={req.path}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[4]
              },
              flex: '1 1 300px', // Grow, shrink, base width
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: 'primary.main', mr: 2 }}>
                  {req.icon}
                </Box>
                <Typography variant="h5" component="h2">
                  {req.title}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {req.description}
              </Typography>

              <Box component="ul" sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                mb: 3
              }}>
                {req.items.map((item) => (
                  <Box
                    component="li"
                    key={item}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 0.5,
                      color: 'text.secondary',
                      '&::before': {
                        content: '""',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        mr: 1.5,
                        opacity: 0.7
                      }
                    }}
                  >
                    <Typography variant="body2">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 'auto', p: 2, pt: 0 }}>
              <ListItemButton
                component={Link}
                href={req.path}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    '& .MuiListItemIcon-root': {
                      transform: 'translateX(4px)'
                    }
                  }
                }}
              >
                <ListItemText
                  primary="View Details"
                  primaryTypographyProps={{
                    color: 'primary'
                  }}
                />
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  color: 'primary.main',
                  transition: 'transform 0.2s ease-in-out'
                }}>
                  <ArrowForwardIcon />
                </ListItemIcon>
              </ListItemButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default RequirementsPage;
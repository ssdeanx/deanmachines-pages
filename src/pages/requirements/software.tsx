// pages/requirements/software.tsx
import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import CodeIcon from '@mui/icons-material/Code';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MemoryIcon from '@mui/icons-material/Memory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WebIcon from '@mui/icons-material/Web';

function SoftwareRequirementsPage() {
  const requirements = [
    {
      title: 'Ubuntu 20.04 (or later)',
      icon: <ComputerIcon />,
      description: 'Operating System for the NVIDIA Jetson Orin Nano'
    },
    {
      title: 'NVIDIA JetPack SDK',
      icon: <DeveloperBoardIcon />,
      description: 'For accessing NVIDIA hardware and libraries'
    },
    {
      title: 'Python 3.8 (or later)',
      icon: <CodeIcon />,
      description: 'Primary programming language'
    },
    {
      title: 'ROS 2 (Robot Operating System)',
      icon: <PrecisionManufacturingIcon />,
      description: 'Framework for robot software development'
    },
    {
      title: 'CUDA Toolkit',
      icon: <MemoryIcon />,
      description: 'For GPU-accelerated computing'
    },
    {
      title: 'TensorFlow/PyTorch',
      icon: <PsychologyIcon />,
      description: 'For machine learning tasks'
    },
    {
      title: 'OpenCV',
      icon: <VisibilityIcon />,
      description: 'For computer vision tasks'
    },
    {
      title: 'Next.js',
      icon: <WebIcon />,
      description: 'Frontend Framework'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Software Requirements
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Required software and frameworks for Dean Machines development
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

export default SoftwareRequirementsPage;
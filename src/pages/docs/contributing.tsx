// pages/docs/contributing.tsx
import React from 'react';
import { Container, Typography, Box, Paper, Grid, ListItemText, ListItemIcon } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import MergeIcon from '@mui/icons-material/Merge';
import BugReportIcon from '@mui/icons-material/BugReport';
import RuleIcon from '@mui/icons-material/Rule';
import Head from 'next/head';

function ContributingPage() {
  const contributingSteps = [
    {
      title: 'Fork the Repository',
      description: 'Create your own copy of the project to work on',
      icon: <GitHubIcon fontSize="large" />
    },
    {
      title: 'Create a Feature Branch',
      description: 'git checkout -b feature/amazing-feature',
      icon: <CodeIcon fontSize="large" />
    },
    {
      title: 'Make Your Changes',
      description: 'Implement your feature or fix with clear commits',
      icon: <MergeIcon fontSize="large" />
    },
    {
      title: 'Follow Guidelines',
      description: 'Ensure code style and tests meet our standards',
      icon: <RuleIcon fontSize="large" />
    },
    {
      title: 'Submit Pull Request',
      description: 'Open a PR with a clear description of changes',
      icon: <BugReportIcon fontSize="large" />
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isOpen={true} onClose={() => {}} />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'background.default' }}>
        <Head>
          <title>Contributing</title>
          <meta name="description" content="Contributing Guidelines for Dean Machines" />
        </Head>

        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Contributing
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              Help improve Dean Machines by contributing to our project
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contributing Steps */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <GroupsIcon fontSize="large" />
                  <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                    How to Contribute
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  We welcome contributions to Dean Machines! Follow these steps to get started:
                </Typography>
                <Box>
                  {contributingSteps.map((step, index) => (
                    <Box
                      key={step.title}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        py: 2,
                        borderBottom: index < contributingSteps.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider'
                      }}
                    >
                      <ListItemIcon sx={{ mt: 1 }}>
                        {step.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={step.title}
                        secondary={step.description}
                        primaryTypographyProps={{
                          variant: 'h6',
                          gutterBottom: true
                        }}
                        secondaryTypographyProps={{
                          variant: 'body2'
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Guidelines and Code of Conduct */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <RuleIcon fontSize="large" />
                  <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                    Guidelines
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Before contributing, please read our detailed guidelines to ensure your contributions align with our project standards.
                </Typography>
                <Link href="/CONTRIBUTING.md" passHref style={{ textDecoration: 'none' }}>
                  <Typography color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Read Contributing Guidelines →
                  </Typography>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <GroupsIcon fontSize="large" />
                  <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                    Code of Conduct
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  We are committed to providing a welcoming and inspiring community for all. Please read our Code of Conduct.
                </Typography>
                <Link href="/CODE_OF_CONDUCT.md" passHref style={{ textDecoration: 'none' }}>
                  <Typography color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    View Code of Conduct →
                  </Typography>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default ContributingPage;
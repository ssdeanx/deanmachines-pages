// src/components/Footer.tsx (Correct)
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              DeanMachines
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pioneering the future of robotics and FPV drone technology.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              {['About', 'Products', 'Contact', 'Documentation'].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase()}`}
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://github.com/yourusername" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com/in/yourusername" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com/yourusername" target="_blank">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DeanMachines.com. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
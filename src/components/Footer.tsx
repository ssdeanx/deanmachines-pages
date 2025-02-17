// src/components/Footer.tsx (Correct)
import React from 'react';
import { Box, Container, Stack, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { alpha, styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  backgroundColor: alpha(theme.palette.background.default, 0.95),
  backdropFilter: 'blur(10px)',
  boxShadow: `0px -5px 15px ${alpha(theme.palette.grey[500], 0.1)}`, // Subtle shadow
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} justifyContent="space-between">
          <Stack>
            <Typography variant="h6" color="text.primary" gutterBottom>
              DeanMachines
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Building the future of robotics.
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              {['About', 'Products', 'Contact', 'Documentation'].map((text) => (
                <FooterLink key={text} href={`/${text.toLowerCase()}`} display="block" mb={1}>
                  {text}
                </FooterLink>
              ))}
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <SocialIconButton
                onClick={() => window.open("https://github.com/yourusername", "_blank")}
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </SocialIconButton>
              <SocialIconButton
                onClick={() => window.open("https://linkedin.com/in/yourusername", "_blank")}
                
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialIconButton>
              <SocialIconButton
                onClick={() => window.open("https://twitter.com/yourusername", "_blank")}
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </SocialIconButton>
            </Box>
          </Stack>
        </Stack>
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DeanMachines.com. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
// pages/docs.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';

const documentationLinks = [
  { text: 'Components', href: '/docs/components' },
  { text: 'Contributing', href: '/docs/contributing' },
  { text: 'FPV', href: '/docs/fpv' },
];

function DocsPage() {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Sidebar isOpen={true} onClose={() => {}} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          overflowY: 'auto',
          height: '100%'
        }}
      >
        <Head>
          <title>Documentation</title>
          <meta name="description" content="Documentation for Dean Machines" />
        </Head>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Documentation
          </Typography>

          <Typography paragraph>
            Welcome to the Dean Machines documentation. This section provides detailed information about the Projects features, components, contribution guidelines, and requirements.
          </Typography>

          <List>
            {documentationLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <ListItem component={Link} href={link.href}>
                  <ListItemText primary={link.text} />
                </ListItem>
                {index < documentationLinks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Container>
      </Box>
    </Box>
  );
}

export default DocsPage;
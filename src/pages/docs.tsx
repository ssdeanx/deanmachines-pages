// pages/docs.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function DocsPage() {
  return (
    <div>
      <title>Documentation</title>
      <meta name="description" content="Documentation for Dean Machines" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Documentation
        </Typography>

        <Typography paragraph>
          Welcome to the Dean Machines documentation. This section provides detailed information about the Projects features, components, contribution guidelines, and requirements.
        </Typography>

        <List>
          <ListItem>
            <Link href="/docs/components" passHref>
                <ListItemText primary="Components" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
           <Link href="/docs/contributing" passHref>
                <ListItemText primary="Contributing" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link href="/docs/fpv" passHref>
                <ListItemText primary="FPV" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link href="/docs/requirements" passHref>
                <ListItemText primary="Requirements" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default DocsPage;
// pages/requirements.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function RequirementsPage() {
  return (
    <div>
      <title>Requirements</title>
      <meta name="description" content="Requirements for Dean Machines" />

      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Requirements
        </Typography>

        <Typography paragraph>
          This section outlines the requirements for the Dean Machines project. It is divided into Hardware, Software, and Data requirements.
        </Typography>

        <List>
          <ListItem>
            <Link href="/requirements/hardware" passHref>
                <ListItemText primary="Hardware Requirements" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link href="/requirements/software" passHref>
                <ListItemText primary="Software Requirements" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link href="/requirements/data" passHref>
                <ListItemText primary="Data Requirements" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default RequirementsPage;
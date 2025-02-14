// pages/docs/components.tsx
import React from 'react';
import Link from 'next/link'; // Import Link
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';

const documentationLinks = [
  { text: 'Components', href: '/docs/components' },
  { text: 'Contributing', href: '/docs/contributing' },
  { text: 'FPV', href: '/docs/fpv' },
];

function ComponentsPage() {
  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar isOpen={true} onClose={() => {}} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Head>
                <title>Components</title>
                <meta name="description" content="Documentation for Dean Machines Components" />
            </Head>

            <Container maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Components
                </Typography>

                <Typography paragraph>
                    This section provides documentation for the reusable components used in the Dean Machines project.
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

export default ComponentsPage;
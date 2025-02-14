// pages/docs/requirements.tsx
import React from 'react';
import Link from 'next/link';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';

function RequirementsPage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar isOpen={true} onClose={() => {}} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Head>
                    <title>Requirements</title>
                    <meta name="description" content="Requirements for Dean Machines" />
                </Head>

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
            </Box>
        </Box>
    );
}

export default RequirementsPage;
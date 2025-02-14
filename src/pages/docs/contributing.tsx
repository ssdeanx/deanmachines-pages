// pages/docs/contributing.tsx
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';
import Head from 'next/head';

function ContributingPage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar isOpen={true} onClose={() => {}} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Head>
                    <title>Contributing</title>
                    <meta name="description" content="Contributing Guidelines for Dean Machines" />
                </Head>

                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        Contributing
                    </Typography>

                    <Typography paragraph>
                        We welcome contributions to Dean Machines! Please follow these steps:
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemText primary="1. Fork the repository" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2. Create a feature branch (git checkout -b feature/amazing-feature)" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="3. Commit your changes (git commit -m 'Add amazing feature')" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="4. Push to the branch (git push origin feature/amazing-feature)" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="5. Open a Pull Request" />
                        </ListItem>
                    </List>

                    <Typography paragraph>
                        Read our [<Link href="/CONTRIBUTING.md">Contributing Guidelines</Link>] for detailed information.
                    </Typography>

                    <Typography variant="h3" component="h2" gutterBottom>
                        Code of Conduct
                    </Typography>

                    <Typography paragraph>
                        Please read our [<Link href="/CODE_OF_CONDUCT.md">Code of Conduct</Link>] to keep our community approachable and respectable.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default ContributingPage;
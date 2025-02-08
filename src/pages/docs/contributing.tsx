// pages/docs/contributing.tsx
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function ContributingPage() {
  return (
    <div>
      <title>Contributing</title>
      <meta name="description" content="Contributing Guidelines for Dean Machines" />

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
          Read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.
        </Typography>

        <Typography variant="h3" component="h2" gutterBottom>
          Code of Conduct
        </Typography>

        <Typography paragraph>
          Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.
        </Typography>
      </Container>
    </div>
  );
}

export default ContributingPage;
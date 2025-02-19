import React from 'react';
import { Container, Typography, Box, Grid, Paper, Card, CardContent } from '@mui/material';
import { useSession } from 'next-auth/react';

function DashboardPage() {
  const { data: session, status } = useSession();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Overview Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              [Temporary: Overview statistics and charts will be displayed here]
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              [Temporary: Action buttons and links will be added here]
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                [Temporary: Activity feed will be displayed here]
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;

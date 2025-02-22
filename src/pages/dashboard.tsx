import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';

// Define the DashboardData type to match the API response
interface DashboardData {
  id: string;
  overview: string;
  quickActions: string;
  recentActivity: string;
  createdAt: string; // Or Date, depending on your API
  updatedAt: string; // Or Date, depending on your API
}

function DashboardPage() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null); // Use the defined type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DashboardData = await response.json(); // Explicitly type the response
        setDashboardData(data);
      } catch (e: any) {
        setError(e instanceof Error ? e : new Error(String(e)));
        console.error("Failed to fetch dashboard data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, color: 'red' }}>
        <Typography variant="h6">Error: {error?.message || 'An unexpected error occurred'}</Typography>
      </Container>
    );
  }

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

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
      }}>
        {/* Overview Section */}
        <Paper sx={{
          p: 3,
          height: '100%',
          flex: '1 1 60%',
          minWidth: '300px',
        }}>
          <Typography variant="h5" gutterBottom>
            Overview
          </Typography>
          {dashboardData ? (
            <Typography variant="body2" color="text.secondary">
              {dashboardData.overview}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No overview data available.
            </Typography>
          )}
        </Paper>

        {/* Quick Actions */}
        <Paper sx={{
          p: 3,
          height: '100%',
          flex: '1 1 30%',
          minWidth: '200px',
        }}>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
          {dashboardData ? (
            <Typography variant="body2" color="text.secondary">
              {dashboardData.quickActions}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No quick actions data available.
            </Typography>
          )}
        </Paper>

        {/* Recent Activity */}
        <Card sx={{
          flex: '1 1 100%',
          mt: 3,
        }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            {dashboardData ? (
              <Typography variant="body2" color="text.secondary">
                {dashboardData.recentActivity}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No recent activity data available.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default DashboardPage;

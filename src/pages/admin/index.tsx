import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user.role !== 'ADMIN') {
      router.push('/'); // Redirect to home if not an admin
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
    return null; // Or a "Not Authorized" component
  }

  return (
    <AdminLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">123</Typography> {/* Replace with actual data */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Machines</Typography>
            <Typography variant="h3">45</Typography> {/* Replace with actual data */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Recent Activity</Typography>
            {/* Add recent activity feed here */}
            <Box>...</Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default AdminDashboard;

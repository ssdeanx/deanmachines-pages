import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminFpvPage() {
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
                FPV Management
            </Typography>
            {/* Add your FPV management content here */}
            <p>This is a placeholder for the FPV management page.</p>
        </AdminLayout>
    );
}

export default AdminFpvPage;

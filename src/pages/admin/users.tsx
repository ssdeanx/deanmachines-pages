import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import AdminLayout from '../../components/AdminLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Chip, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { User, Role } from '@prisma/client'; // Import User and Role
import { z } from 'zod';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
});

function AdminUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { data, error, mutate } = useSWR<{users: User[], totalCount: number}>('/api/admin/users?page=1&pageSize=10', fetcher); // Fetch users
    if (error) {
        console.error("Failed to load users", error);
    }
    const [editUser, setEditUser] = useState<User | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params: { value: string }) => ( // Custom cell renderer for role
                <Chip
                    label={params.value}
                    color={params.value === 'ADMIN' ? 'secondary' : 'default'}
                    variant="outlined"
                />
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params: { row: User, id: string }) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => handleEdit(params.row as User)} // Pass the entire user object
                    key={`edit-${params.id}`}
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => handleDelete(params.id as string)}
                    key={`delete-${params.id}`}
                />,
            ],
        },
    ];

    const handleEdit = (user: User) => {
        setEditUser(user);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setEditUser(null);
        setOpenEditDialog(false);
    };

    const handleUpdateUser = async () => {
        if (!editUser) return;

        try {
            const validatedData = userUpdateSchema.parse({
                name: editUser.name,
                email: editUser.email,
                role: editUser.role,
            });

            const response = await fetch(`/api/admin/users/${editUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user');
            }

            mutate(); // Revalidate the data
            handleCloseEditDialog();
        } catch (error) {
            console.error('Failed to update user:', error);
            // Handle errors (e.g., display an error message)
        }
    };

    const handleDelete = (userId: string) => {
        setDeleteUserId(userId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteUserId(null);
        setOpenDeleteDialog(false);
    };

    const confirmDelete = async () => {
        if (!deleteUserId) return;

        try {
            const response = await fetch(`/api/admin/users/${deleteUserId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }

            mutate(); // Revalidate the data
            handleCloseDeleteDialog();
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Handle errors (e.g., display an error message)
        }
    };

    return (
        <AdminLayout>
            <Typography variant="h4" component="h1" gutterBottom>
                User Management
            </Typography>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data?.users || []}
                    columns={columns}
                    pagination
                    getRowId={(row: User) => row.id}
                />
            </div>

            {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={editUser?.name || ''}
                        onChange={(e) => setEditUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={editUser?.email || ''}
                        onChange={(e) => setEditUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                    />
                    <TextField
                        margin="dense"
                        label="Role"
                        fullWidth
                        value={editUser?.role || ''}
                        onChange={(e) => setEditUser(prev => prev ? { ...prev, role: e.target.value as Role } : null)}
                        select
                        SelectProps={{ native: true }}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleUpdateUser} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </AdminLayout>
    );
}

export default AdminUsersPage;

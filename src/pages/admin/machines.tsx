// src/pages/admin/machines.tsx (Added custom cell renderer, animations, and responsiveness, next/image component)
import React from 'react';
import { GridColDef, GridActionsCellItem, GridRenderCellParams, DataGrid, GridInitialState, GridPageSize } from '@mui/x-data-grid';
import AdminLayout from '../../components/AdminLayout';
import useSWR from 'swr';
import { Machine } from '@prisma/client';
import dynamic from 'next/dynamic';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Chip, Box } from '@mui/material';
import { machineSchema } from '@/lib/validationSchemas';
import {z} from 'zod';
import { Delete, Edit } from '@mui/icons-material';
import Image from 'next/image';
import { Fade } from '@mui/material'; // Import Fade
import { JSX } from 'react/jsx-runtime';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DataGridDynamic = dynamic(
  () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
  {
    ssr: false,
    loading: () => <p>Loading DataGrid...</p>,
  }
) as React.ComponentType<DataGridProps>;

interface DataGridProps {
    rows: any[];
    columns: GridColDef[];
    initialState?: GridInitialState;
    pageSizeOptions?: GridPageSize[];
}

export default function MachinesPage(): JSX.Element {
  const { data: machineData, error: machineError, mutate: machineMutate } = useSWR<{machines: Machine[], totalCount: number}>('/api/admin/machines?page=1&pageSize=5', fetcher);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteMachineId, setDeleteMachineId] = React.useState<number>(0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'image',
        headerName: 'Image',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
             <Image
                src={params.value}
                alt={"Machine image"}
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
            />
        ),
    },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300, },
    { field: 'price', headerName: 'Price', width: 120,  type: 'number', },
    {
    field: 'category',
    headerName: 'Category',
    width: 150,
    renderCell: (params: GridRenderCellParams) => ( // Custom cell renderer for role
      <Chip
        label={params.value}
        variant="outlined"
      />
    ),
  },

    {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }: { id: number | string }) => [
        //Added key prop
        <GridActionsCellItem
            key={"edit"+id}
            icon={<Edit />}
            label="Edit"
            onClick={() => handleEdit(Number(id))}
        />,
        <GridActionsCellItem
            key={"delete"+id}
            icon={<Delete />}
            label="Delete"
            onClick={() => handleDelete(Number(id))}
        />
      ]
    }
  ];
    
    const handleClickOpenCreate = () => {
  setOpenCreate(true);
};
  //create states and functions
  const handleDelete = (id: number) => {
    setOpenDelete(true);
    setDeleteMachineId(id);
  };

  //Create machine states and functions
  const [openCreate, setOpenCreate] = React.useState(false);
  const [newMachine, setNewMachine] = React.useState({ title: '', description: '',image:"", price: 0, category:"" });
  const handleInputChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMachine({ ...newMachine, [e.target.name]: e.target.value });
  };
  const handleSubmitCreate = async () => {
    try {
      const validatedData = machineSchema.parse(newMachine);
      const response = await fetch('/api/admin/machines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create machine');
      }
      // Invalidate and refetch the data
      machineMutate();

      // Reset form and close modal
      setNewMachine({ title: '', description: '',image:"", price: 0, category:"" });
      handleCloseDelete();

    } catch (error) {
      if (error instanceof z.ZodError) {
          // Handle Zod validation errors
          console.error('Validation errors:', error.errors);
           alert("error:" + error.errors[0].message);

        } else {
          // Handle other errors
          console.error('Failed to create machine:', error);
          alert("Error:" + error)
        }
    }
  };

  //Edit states and functions
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editMachine, setEditMachine] = React.useState<{id: number; title: string; description: string; image:string; price:number; category:string;}>({ id: 0, title: '', description: '',image:"", price: 0, category:""  });

  const handleEdit = (id: number) => {
     // Find the machine with the matching ID
    const machineToEdit = machineData?.machines.find((machine) => machine.id === id);

    if (machineToEdit) {
        // If a machine is found, update the editMachine state with default empty string for null category
        setEditMachine({
            ...machineToEdit,
            category: machineToEdit.category || ''
        });
        // Open the edit modal
        setOpenEdit(true);
    } else {
        // Handle the case where no machine is found (optional)
        console.error(`machine with id ${id} not found`);
    }
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMachine({ ...editMachine, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async (id:number) => {
     try {
      const validatedData = machineSchema.parse(editMachine);
      const response = await fetch(`/api/admin/machines/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update machine');
      }
        // Invalidate and refetch the data
      machineMutate();
      // close modal
      handleCloseEdit();

    } catch (error) {
      if (error instanceof z.ZodError) {
          // Handle Zod validation errors
          console.error('Validation errors:', error.errors);
          alert("Error:" + error.errors[0].message);
        } else {
          // Handle other errors
          console.error('Failed to update machine:', error);
           alert("Error:" + error)
        }
    }
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
     setDeleteMachineId(0);
  };

  const confirmDelete = async () => {
     try {
        const response = await fetch(`/api/admin/machines/${deleteMachineId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete machine');
        }
        // Invalidate and refetch the data
        machineMutate();
        // close modal
        handleCloseDelete();

    } catch (error) {
       console.error('Failed to delete machine:', error);
       alert("Error:" + error)
    }
  }

  // main page
  if (machineError) return <div>Failed to load machines</div>;
  if (!machineData) return <div>Loading...</div>;

  return (    
    <AdminLayout>
      <Button variant="contained" color="primary" onClick={handleClickOpenCreate}>
        Create machine
      </Button>
      <Box sx={{ height: 400, width: '100%' }}> {/*Use Box for responsive width*/}
        <DataGridDynamic
          {...(machineData?.machines ? { rows: machineData.machines } : { rows: [] })}
          columns={columns}
           initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
        />
      </Box>

      <Dialog open={openCreate} onClose={handleCloseDelete} TransitionComponent={Fade}>
        <DialogTitle>Create New machine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={newMachine.title}
            onChange={handleInputChangeCreate}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newMachine.description}
            onChange={handleInputChangeCreate}
          />
           <TextField
            margin="dense"
            name="image"
            label="Image Url"
            type="text"
            fullWidth
            value={newMachine.image}
            onChange={handleInputChangeCreate}
          />
           <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newMachine.price}
            onChange={(e) => setNewMachine({ ...newMachine, price: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={newMachine.category}
            onChange={handleInputChangeCreate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleSubmitCreate} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

       <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Fade}>
        <DialogTitle>Edit machine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={editMachine.title}
            onChange={handleInputChangeEdit}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editMachine.description}
            onChange={handleInputChangeEdit}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image Url"
            type="text"
            fullWidth
            value={editMachine.image}
            onChange={handleInputChangeEdit}
          />
           <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={editMachine.price}
            onChange={(e) => setEditMachine({ ...editMachine, price: Number(e.target.value) })}

          />
           <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={editMachine.category}
            onChange={handleInputChangeEdit}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={()=>handleSubmitEdit(editMachine.id)} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Fade}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this machine?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>  );
}

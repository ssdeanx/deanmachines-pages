'use client';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSession } from "next-auth/react";
import DropdownMenu from './DropdownMenu';

export default function AdminNavbar() {
  const { data: session } = useSession();

  const adminMenuItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {session?.user && (
            <DropdownMenu
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountCircleIcon />
                  <Typography>{session.user.name}</Typography>
                </Box>
              }
              items={adminMenuItems}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

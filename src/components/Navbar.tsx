// src/components/Navbar.tsx
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Avatar,
  Stack,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  alpha,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SignInPopout from './SignInPopout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Machines', href: '/machines' },
  { label: 'Contact', href: '/contact' },
  { label: 'Docs', href: '/docs' },
];

// Removing unused docsDropdownItems array

function Navbar({ toggleColorMode }: { toggleColorMode: () => void }) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [signInOpen, setSignInOpen] = useState(false);
  const pathname = usePathname();

  const handleSignInClick = () => {
    setSignInOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <Link href="/" passHref>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/dean-machines-logo.png" alt="Dean Machines Logo" width={50} height={50} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1, color: theme.palette.text.primary }}>
              DeanMachines
            </Typography>
          </Box>
        </Link>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="end"
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} component={Link} href={item.href} >
            <ListItemIcon>
              {item.label === 'Home' ? <HomeIcon /> :
                item.label === 'About' ? <InfoIcon /> :
                  item.label === 'Machines' ? <BuildIcon /> :
                    item.label === 'Contact' ? <ContactMailIcon /> :
                      <DescriptionIcon />}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {status === "loading" ? (
        <Typography>Loading...</Typography>
      ) : session?.user ? (
        <>
          <List>
            {session.user.role === 'ADMIN' && (
              <ListItem component={Link} href="/admin">
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            <ListItem component={Link} href="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => { signOut(); router.push('/'); }}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem onClick={handleSignInClick}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem component={Link} href="/signup">
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Sign up" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: alpha(theme.palette.background.default, 0.95),
          backdropFilter: 'blur(10px)',
          boxShadow: `0px 2px 10px ${alpha(theme.palette.grey[900], 0.1)}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Link href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Image src="/dean-machines-logo.png" alt="Dean Machines Logo" width={50} height={50} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1, color: theme.palette.text.primary }}>
                  DeanMachines
                </Typography>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Stack direction="row" spacing={2}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: theme.palette.secondary.main,
                        transform: pathname === item.href ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>

              {/* Theme Toggle and Actions */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                  component="a"
                  href="https://github.com/ssdeanx/deanmachines-pages"
                  target="_blank"
                  color="inherit"
                >
                  <GitHubIcon />
                </IconButton>
                {status === "authenticated" ? (
                  <IconButton onClick={() => signOut()}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={session.user?.image || undefined}
                    >
                      {session.user?.name?.charAt(0) || <AccountCircleIcon />}
                    </Avatar>
                  </IconButton>
                ) : (
                  <Button color="inherit" onClick={handleSignInClick}>
                    Sign In
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <SignInPopout open={signInOpen} onClose={handleSignInClose} />
    </Box>
  );
}

export default Navbar;
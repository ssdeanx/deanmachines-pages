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
  Tooltip,
  Fade,
  useScrollTrigger,
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
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'About', href: '/about', icon: <InfoIcon /> },
  { label: 'Machines', href: '/machines', icon: <BuildIcon /> },
  { label: 'Contact', href: '/contact', icon: <ContactMailIcon /> },
  { label: 'Docs', href: '/docs', icon: <DescriptionIcon /> },
];

function Navbar({ toggleColorMode }: { toggleColorMode: () => void }) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const pathname = usePathname();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleSignInClick = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Link href="/" passHref>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/dean-machines-logo.png" 
              alt="Dean Machines Logo" 
              width={40} 
              height={40}
              style={{ borderRadius: '8px' }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                ml: 1.5,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                  : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              DeanMachines
            </Typography>
          </Box>
        </Link>
        <IconButton onClick={handleDrawerToggle} sx={{ p: 1 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, py: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={Link} 
            href={item.href}
            sx={{
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              ...(pathname === item.href && {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
              })
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: pathname === item.href ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        {status === "loading" ? (
          <Typography variant="body2" color="text.secondary">Loading...</Typography>
        ) : session?.user ? (
          <Stack spacing={2}>
            {session.user.role === 'ADMIN' && (
              <Button
                component={Link}
                href="/admin"
                startIcon={<AdminPanelSettingsIcon />}
                fullWidth
                variant="outlined"
                size="small"
              >
                Admin Panel
              </Button>
            )}
            <Button
              component={Link}
              href="/dashboard"
              startIcon={<DashboardIcon />}
              fullWidth
              variant="outlined"
              size="small"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => { signOut(); router.push('/'); }}
              startIcon={<ExitToAppIcon />}
              fullWidth
              variant="contained"
              color="error"
              size="small"
            >
              Sign Out
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Button
              onClick={handleSignInClick}
              startIcon={<VpnKeyIcon />}
              fullWidth
              variant="contained"
              size="small"
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/signup"
              startIcon={<PersonAddIcon />}
              fullWidth
              variant="outlined"
              size="small"
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: alpha(theme.palette.background.default, trigger ? 0.95 : 0.98),
          backdropFilter: 'blur(10px)',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'color'], {
            duration: theme.transitions.duration.short,
          }),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: { xs: 64, sm: 70 },
              transition: theme.transitions.create('min-height', {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            <Link href="/" passHref>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 }
              }}>
                <Image 
                  src="/dean-machines-logo.png" 
                  alt="Dean Machines Logo" 
                  width={40} 
                  height={40}
                  style={{ borderRadius: '8px' }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    ml: 1.5,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  DeanMachines
                </Typography>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center',
              flexGrow: 1,
              gap: 1
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'primary.main',
                      transform: pathname === item.href ? 'scaleX(1)' : 'scaleX(0)',
                      transition: theme.transitions.create('transform', {
                        duration: theme.transitions.duration.shorter,
                      }),
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Theme Toggle and Actions */}
            <Stack 
              direction="row" 
              spacing={{ xs: 1, sm: 2 }} 
              alignItems="center"
              sx={{ ml: 'auto' }}
            >
              <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton 
                  onClick={toggleColorMode}
                  color="inherit"
                  sx={{ 
                    transition: theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shorter,
                    }),
                    '&:hover': {
                      transform: 'rotate(12deg)',
                    },
                  }}
                >
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="View source code">
                <IconButton
                  component="a"
                  href="https://github.com/ssdeanx/deanmachines-pages"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{
                    transition: theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shorter,
                    }),
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>

              {status === "authenticated" ? (
                <Tooltip title="Account settings">
                  <IconButton 
                    onClick={() => signOut()}
                    sx={{
                      p: 0.5,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      transition: theme.transitions.create(['border-color', 'transform'], {
                        duration: theme.transitions.duration.shorter,
                      }),
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main 
                      }}
                      src={session.user?.image || undefined}
                    >
                      {session.user?.name?.charAt(0) || <AccountCircleIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button 
                  color="primary"
                  variant="contained"
                  onClick={handleSignInClick}
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: 1,
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Icon */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: theme.palette.background.default,
          },
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <SignInPopout open={signInOpen} onClose={handleSignInClose} />
    </>
  );
}

export default Navbar;
// src/components/Navbar.tsx (Corrected, no tooltips)
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
  Avatar,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Import dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Import light mode icon

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/machines' },
  { label: 'Contact', href: '/contact' },
    { label: 'Requirements', href: '/requirements'}
];

const accountDropdownItems = [
  { label: 'Profile', href: '/profile', icon: <AccountCircleIcon /> },
  { label: 'Settings', href: '/settings' },
  { label: 'Logout',  icon: <AccountCircleIcon /> }, // Removed href
];

const docsDropdownItems = [
    { label: 'Components', href: '/docs/components'},
    { label: 'Contributing', href: '/docs/contributing'},
    { label: 'FPV', href: '/docs/fpv'},

]

function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark'); // Track dark mode state

  const { data: session, status } = useSession();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  return (
    <AppBar position="static" sx={{ boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
            TransitionProps={{
                timeout: 300
            }}
          >
           {navItems.map((item) => (
            <MenuItem key={item.label} onClick={handleCloseNavMenu}>
                <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'block' }}>
                  <Typography
                    textAlign="center"
                    color={pathname === item.href ? 'primary' : 'textPrimary'}
                    sx={{
                      borderBottom: pathname === item.href ? `2px solid ${theme.palette.primary.main}` : 'none',
                      display: 'block',
                      width: '100%',
                      pb: 0.5
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
              {/* Mobile Docs Dropdown */}
            <MenuItem >
                <DropdownMenu label={<Typography>Docs <KeyboardArrowDownIcon/></Typography>} items={docsDropdownItems} />
            </MenuItem>
             {/* Mobile Account Dropdown/Sign In */}
            {status === "authenticated" ? (
              <MenuItem>
                <DropdownMenu
                  label={
                    <>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}>
                        <AccountCircleIcon />
                      </Avatar>
                      <Typography>{session.user?.name || 'User'}</Typography>
                    </>
                  }
                  items={accountDropdownItems.map(item => ({ ...item, onClick: item.label === 'Logout' ? signOut : undefined }))}

                />
              </MenuItem>
               ) : (
                  <MenuItem onClick={() => signIn()}>
                    <Typography>Sign In</Typography>
                </MenuItem>
            )}
          </Menu>

          {/* Logo (Mobile and Desktop) */}
          <Box sx={{ width: {xs: '100px', md: '150px'}, height: {xs: '33px', md: '50px'}, position: 'relative', mr: 2 }}>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="DeanMachines Logo"
                fill
                style={{ objectFit: 'contain' }}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            </Link>
          </Box>

          {/* Navigation Links (Desktop) */}
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Stack direction="row" spacing={1}>
                    {navItems.map((item) => (
                    <Link key={item.label} href={item.href} passHref legacyBehavior>
                        <Button
                            component="a"
                            sx={{
                                color: 'white',
                                display: 'block',
                                '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                                transform: 'scale(1.03)',
                                },
                                textTransform: 'none',
                                fontSize: '0.9rem',
                                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                                borderBottom: pathname === item.href ? `2px solid ${theme.palette.secondary.main}` : 'none',
                                borderRadius: 0,
                                pb: 0.5
                            }}
                            color={pathname === item.href ? 'secondary' : 'inherit'}
                        >
                            {item.label}
                        </Button>
                    </Link>
                  ))}
                    <DropdownMenu label={<Typography sx={{color: 'white'}}>Docs </Typography>} items={docsDropdownItems} />

                </Stack>
            </Box>
          {/* Account/Sign In (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row" spacing={1} alignItems="center">
            {/* Theme Toggle and GitHub Icon */}
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton color="inherit" component="a" href="https://github.com/ssdeanx/deanmachines-pages" aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
            {status === "authenticated" ? (
              <>

                <DropdownMenu
                  label={
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                      <AccountCircleIcon />
                    </Avatar>
                  }
                    items={accountDropdownItems.map(item => ({ ...item, onClick: item.label === 'Logout' ? signOut : undefined }))}
                />

              </>
            ) : (
              <>
                <Button
                    onClick={() => signIn('google')}
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'none',  }}
                >
                  Sign In
                </Button>
                {/* GitHub Sign In Removed */}
              </>
            )}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
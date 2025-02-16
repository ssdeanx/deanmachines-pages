// src/components/Navbar.tsx
'use client';
import React, { useState, useEffect } from 'react';
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
  Stack,
  useTheme,
  Slide,
  useScrollTrigger,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useSession, signIn } from "next-auth/react";
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { alpha, styled } from '@mui/material/styles';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  transition: 'all 0.3s ease-in-out',
  boxShadow: 'none',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 56,
  [theme.breakpoints.up('sm')]: {
    minHeight: 64,
  },
  display: 'flex',
  justifyContent: 'space-between',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
  textTransform: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.secondary.main,
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/machines' },
    { label: 'Contact', href: '/contact' },
    { label: 'Requirements', href: '/requirements' }
  ];

  const docsDropdownItems = [
    { label: 'Components', href: '/docs/components'},
    { label: 'Contributing', href: '/docs/contributing'},
    { label: 'FPV', href: '/docs/fpv'},
  ];

  return (
    <HideOnScroll>
      <StyledAppBar
        sx={{
          backgroundColor: isScrolled 
            ? alpha(theme.palette.background.default, 0.95)
            : 'transparent',
          boxShadow: isScrolled ? 1 : 0,
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar>
            {/* Logo */}
            <Fade in timeout={1000}>
              <Box sx={{ 
                width: {xs: '100px', md: '150px'}, 
                height: {xs: '33px', md: '50px'}, 
                position: 'relative',
                cursor: 'pointer'
              }}>
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="DeanMachines Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Link>
              </Box>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              alignItems: 'center'
            }}>
              <Stack direction="row" spacing={2}>
                {navItems.map((item) => (
                  <Fade key={item.label} in timeout={1000}>
                    <Link href={item.href} passHref style={{ textDecoration: 'none' }}>
                      <NavButton
                        sx={{
                          '&::after': {
                            width: pathname === item.href ? '100%' : '0%',
                          },
                        }}
                      >
                        {item.label}
                      </NavButton>
                    </Link>
                  </Fade>
                ))}
                <DropdownMenu 
                  label={
                    <Typography sx={{ color: theme.palette.text.primary }}>
                      Docs
                    </Typography>
                  } 
                  items={docsDropdownItems} 
                />
              </Stack>

              {/* Theme Toggle and Actions */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton 
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ 
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'rotate(180deg)' }
                  }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton 
                  component="a"
                  href="https://github.com/ssdeanx/deanmachines-pages"
                  target="_blank"
                  sx={{ 
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                {status === "authenticated" ? (
                  <Avatar 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                    src={session.user?.image || undefined}
                  >
                    {session.user?.name?.charAt(0) || <AccountCircleIcon />}
                  </Avatar>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => signIn('google')}
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      }
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={(e) => setAnchorElNav(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: 'block', md: 'none' } }}
              TransitionComponent={Fade}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {navItems.concat(docsDropdownItems).map((item) => (
                <MenuItem 
                  key={item.label}
                  onClick={() => setAnchorElNav(null)}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: pathname === item.href ? theme.palette.primary.main : 'inherit',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </HideOnScroll>
  );
}

export default Navbar;
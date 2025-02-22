// src/components/Navbar.tsx
'use client';
import React, { useState, useRef, useEffect, ReactNode, lazy, useMemo, Suspense } from 'react';
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
  useMediaQuery,
  Tooltip,
  Fade,
  Slide,
  useScrollTrigger,
  CircularProgress,
  type ButtonProps,
  Theme,
  BoxProps,
  PaletteColor,
  ThemeProvider,
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { alpha } from '@mui/material/styles';
import { motion, type Variants, type MotionProps } from 'framer-motion';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { PaletteMode } from '@mui/material';

const drawerWidth = 240;

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const navItems = useMemo(() => [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'About', href: '/about', icon: <InfoIcon /> },
  { label: 'Machines', href: '/machines', icon: <BuildIcon /> },
  { label: 'Contact', href: '/contact', icon: <ContactMailIcon /> },
  { label: 'Docs', href: '/docs', icon: <DescriptionIcon /> },
], []);

interface NavbarProps {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

function Navbar({ toggleColorMode, mode }: NavbarProps) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const pathname = usePathname();
  const navListRef = useRef<HTMLUListElement>(null);
  const [staggeredItems, setStaggeredItems] = useState<React.ReactNode[]>([]);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleSignInClick = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    if (mobileOpen && navListRef.current) {
      const listItems = Array.from(navListRef.current.children);
      setStaggeredItems(
        listItems.map((_, index) => (
          <Slide key={navItems[index].label} in={mobileOpen} direction="up" timeout={index * 50}>
            <div style={{ opacity: 1, transform: 'translateY(0)' }} />
          </Slide>
        ))
      );
    }
    return () => timeoutIds.forEach(clearTimeout);
  }, [mobileOpen]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      // Consider adding error toast/notification
    }
  };

  const drawer = (
    <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
      <Box
        onClick={handleDrawerToggle}
        sx={{
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
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
                width={36}
                height={36}
                style={{ borderRadius: '6px' }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  ml: 1.5,
                  letterSpacing: -0.5,
                  color: theme.palette.primary.main,
                }}
              >
                DeanMachines
              </Typography>
            </Box>
          </Link>
          <IconButton onClick={handleDrawerToggle} sx={{ p: 1, color: theme.palette.text.primary }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, py: 2 }} ref={navListRef}>
          {navItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              href={item.href}
              sx={[
                {
                  py: 1.2,
                  px: 3,
                  borderRadius: 1,
                  transition: theme.transitions.create('background-color'),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                },
                pathname === item.href && {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                }
              ]}
            >
              <ListItemIcon sx={{ minWidth: 36, color: theme.palette.text.secondary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: pathname === item.href ? 600 : 500,
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mt: 'auto', opacity: 0.2 }} />

        <Box sx={{ p: 2 }}>
          {status === "loading" ? (
            <Typography variant="body2" color="text.secondary">Loading...</Typography>
          ) : session?.user ? (
            <Stack spacing={1.5}>
              {session.user.role === 'ADMIN' && (
                <Button
                  component={Link}
                  href="/admin"
                  startIcon={<AdminPanelSettingsIcon />}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 500 }}
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
                sx={{ fontWeight: 500 }}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleSignOut}
                startIcon={<ExitToAppIcon />}
                fullWidth
                variant="contained"
                color="error"
                size="small"
                sx={{ fontWeight: 500 }}
              >
                Sign Out
              </Button>
            </Stack>
          ) : (
            <Stack spacing={1.5}>
              <Button
                onClick={handleSignInClick}
                variant="contained"
                color="primary"
                size="small"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 4,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    boxShadow: theme.shadows[2],
                  }
                }}
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
                sx={{ fontWeight: 500 }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Slide>
  );

  // 1. Memoized NavItems with stable reference
  const MemoizedNavItems = React.memo(({ items }: { items: NavItem[] }) => {
    const pathname = usePathname();
    const theme = useTheme();
    
    return (
      <>
        {items.map((item) => (
          <Box
            component={Link}
            href={item.href}
            key={item.label}
            aria-current={pathname === item.href ? 'page' : undefined}
            sx={[
              {
                color: theme.palette.text.primary,
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                p: '6px 12px',
                borderRadius: 4,
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateY(-1px)',
                },
              },
              pathname === item.href && {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                fontWeight: 600,
              }
            ]}
            prefetch={pathname !== item.href} // Next.js intelligent prefetch
          >
            {item.label}
          </Box>
        ))}
      </>
    );
  });

  // 2. Optimized Logo component with priority loading
  const Logo = React.memo(() => {
    const logoStyle = useMemo(() => ({
      borderRadius: '5px',
      transform: 'translateZ(0)',
      willChange: 'transform'
    }), []);
    
    return <Image 
      src="/dean-machines-logo.png" 
      alt="Dean Machines Logo" 
      width={32} 
      height={32}
      priority
      placeholder="blur"
      blurDataURL="data:image/png;base64,..." // Add actual blur hash
      style={logoStyle}
    />;
  });

  // 2. Proper motion component typing
  const MotionBox = motion(Box);
  const MotionButton = motion(Button) as React.ComponentType<ButtonProps & MotionProps>;

  // 3. Modern link animation
  const linkHoverEffect = {
    whileHover: { 
      scale: 1.05,
      textShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`
    },
    whileTap: { scale: 0.95 }
  };

  // 6. Dynamic import with Suspense boundary
  const SignInPopout = React.lazy(() => import('./SignInPopout'));

  // 1. Add cutting-edge micro-interactions
  const cyberHoverEffect = {
    whileHover: {
      scale: 1.02,
      textShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.4)}`,
      background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    whileTap: { scale: 0.98 }
  };

  // 2. Neon border effect component
  const NeonBorder = styled(Box)(({ theme }) => ({
    position: 'relative' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      inset: 0,
      borderRadius: 8,
      padding: '2px',
      background: `linear-gradient(45deg, ${(theme as Theme).palette.primary.main} 0%, ${(theme as Theme).palette.secondary.main} 100%)`,
      WebkitMask: 
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      animation: `${neonPulse} 2s infinite alternate`
    }
  }));

  // 3. Add keyframes for animations
  const neonPulse = keyframes`
    from { opacity: 0.4; }
    to { opacity: 1; }
  `;

  // 4. Cyber-style theme toggle
  const CyberToggle = () => (
    <ThemeProvider theme={theme}>
      <NeonBorder>
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'relative',
            '& svg': {
              filter: `drop-shadow(0 0 4px ${alpha(theme.palette.primary.main, 0.4)})`
            }
          }}
        >
          {mode === 'dark' ? (
            <Brightness7Icon sx={{ color: theme.palette.warning?.main }} />
          ) : (
            <Brightness4Icon sx={{ color: theme.palette.primary.main }} />
          )}
        </IconButton>
      </NeonBorder>
    </ThemeProvider>
  );

  // 5. Holographic avatar effect
  const HolographicAvatar = () => (
    session?.user?.image && (
      <Box
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle at 50% 50%, 
              ${alpha(theme.palette.primary.main, 0.4)} 0%, 
              transparent 70%)`,
            animation: `${hologramPulse} 3s infinite`
          }
        }}
      >
        <Avatar
          src={session.user.image}
          sx={{
            width: 36,
            height: 36,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.3)}`
          }}
        />
      </Box>
    )
  );

  // 6. Add hologram animation
  const hologramPulse = keyframes`
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
    100% { opacity: 0.4; transform: scale(1); }
  `;

  // 7. Cyber-style sign in button
  const CyberSignInButton = () => (
    <MotionButton
      component={motion.div}
      onClick={handleSignInClick}
      variant="contained"
      {...cyberHoverEffect}
      sx={{
        fontWeight: 700,
        letterSpacing: '1px',
        background: `linear-gradient(145deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 100%)`,
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(
            120deg,
            transparent,
            ${alpha(theme.palette.common?.white || '', 0.3)},
            transparent
          )`,
          transition: 'left 0.6s'
        },
        '&:hover::before': {
          left: '100%'
        }
      }}
    >
      SIGN IN
    </MotionButton>
  );

  // Add missing glassEffect definition
  const glassEffect = {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(12px) saturate(180%)',
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
  };

  // Remove duplicate declaration and merge styles
  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: alpha((theme as Theme).palette.background.default, 0.97),
      backdropFilter: 'blur(16px)',
      borderRight: `1px solid ${alpha((theme as Theme).palette.divider, 0.2)}`
    }
  }));

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ...glassEffect,
          transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.complex
          })
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Toolbar>
            <Link href="/" passHref>
              <MotionButton
                {...linkHoverEffect}
                sx={{
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.5px'
                }}
              >
                <Logo />
              </MotionButton>
            </Link>
          </Toolbar>
        </MotionBox>
      </AppBar>
      <nav>
        <ThemeProvider theme={theme}>
          <StyledDrawer
            container={typeof window !== 'undefined' ? document.body : undefined}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </StyledDrawer>
        </ThemeProvider>
      </nav>
      <Suspense fallback={<CircularProgress size={24} />}>
        <SignInPopout open={signInOpen} onClose={handleSignInClose} />
      </Suspense>
    </>
  );
}

export default Navbar;
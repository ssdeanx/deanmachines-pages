// pages/_app.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import themeConfig from '../theme'; // Import your theme configuration
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router';
import '../global.css'
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';

// --- Optimized Font Import (Inter + Roboto Mono) ---
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/roboto-mono/400.css';

declare module '@mui/material/styles' { // TypeScript declaration merging
    interface TypographyVariants {
      code: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
      code?: React.CSSProperties;
    }
  }
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      code: true;
    }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [mode, setMode] = useState<'light' | 'dark'>('light'); // State for theme mode
    const router = useRouter();
    const isDocsPage = router.pathname.startsWith('/docs');

    // Use useMemo to prevent unnecessary re-renders
    const theme = useMemo(() => createTheme(themeConfig[mode]), [mode]);

    // Function to toggle the theme
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Theme persistence
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    return (
        <ErrorBoundary>
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Layout toggleColorMode={toggleColorMode}>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SessionProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
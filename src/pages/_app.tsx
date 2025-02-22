// pages/_app.tsx
import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme, type PaletteColor, type PaletteMode } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import appThemeConfig from '../theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Head from 'next/head'; // Import Head

// --- Optimized Font Import (Inter + Roboto Mono) ---
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/roboto-mono/400.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [mode, setMode] = useState<PaletteMode>('light');
    const router = useRouter();
    const isDocsPage = router.pathname.startsWith('/docs');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode, // Add mode to the context value
        }),
        [setMode, mode], // Include mode in the dependency array
    );

    // Use useMemo to prevent unnecessary re-renders
    const theme = useMemo(() => createTheme(appThemeConfig(mode)), [mode]);

    useEffect(() => {
        // Get stored theme or system preference on client-side
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
            if (storedMode) {
                setMode(storedMode); // Set mode from local storage
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setMode(prefersDark ? 'dark' : 'light'); // Set mode from system preference
            }
        }
    }, []); // Run only once on mount

    useEffect(() => {
        // Update localStorage and data-theme attribute when mode changes
        if (typeof window !== 'undefined') {
            localStorage.setItem('themeMode', mode);
            document.documentElement.setAttribute('data-theme', mode);
        }
    }, [mode]);

    return (
        <ErrorBoundary>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Layout toggleColorMode={colorMode.toggleColorMode} mode={mode}>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SessionProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
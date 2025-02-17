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


    useEffect(() => {
        // Check local storage for saved theme preference
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // Default to light mode if no preference is found
            setMode('light');
        }
    }, []);

    useEffect(() => {
        // Save theme preference to local storage
        localStorage.setItem('themeMode', mode);
    }, [mode]);


  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout toggleColorMode={toggleColorMode}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <main style={{ flexGrow: 1, paddingTop: isDocsPage ? '0px' : '64px' }}>
            <Component {...pageProps} />
          </main>
          <Footer />
          </div>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
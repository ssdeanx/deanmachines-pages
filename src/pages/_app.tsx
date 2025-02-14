// pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { SessionProvider } from "next-auth/react"
import themeConfig from '../theme'; // Import the theme

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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme(
        prefersDarkMode ? themeConfig.dark : themeConfig.light
      ),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <SessionProvider session={session}>
            <Layout>
            <Component {...pageProps} />
            </Layout>
        </SessionProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;
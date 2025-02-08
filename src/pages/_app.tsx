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
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#990000',
            light: '#c92a2a',
          },
          secondary: {
            main: '#990000',
            light: '#c92a2a'
          },
          background: {
            default: prefersDarkMode ? '#121212' : '#fafafa',
            paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: prefersDarkMode ? 'rgba(255,255,255,0.87)' : 'rgba(0,0,0,0.87)',
            secondary: prefersDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
          },
        },
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            marginBottom: '1rem',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
            marginBottom: '0.75rem',
          },
          h5: {
              fontSize: '1.1rem',
          },
          body2: {
              fontStyle: 'italic'
          },
          button: {
            fontWeight: 500,
          },
          code: {
            fontFamily: '"Roboto Mono", monospace',
          }
        },
        spacing: 8,
        shadows: [
          'none',
          '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.05),0px 1px 3px 0px rgba(0,0,0,0.05)',
          '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.05),0px 1px 8px 0px rgba(0,0,0,0.05)',
          'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
          'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
          'none', 'none', 'none', 'none'
        ],
        transitions: {
          easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: prefersDarkMode ? '#333333' : '#ffffff',
              }
            }
          },
          MuiContainer: {
            styleOverrides: {
                maxWidthMd: {
                    maxWidth: '800px'
                }
            }
          }
        },
      }),
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
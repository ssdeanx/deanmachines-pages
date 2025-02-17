import { ThemeOptions } from '@mui/material/styles';

const lightPalette: ThemeOptions['palette'] = {
  primary: {
    main: '#990000',
    light: '#c92a2a',
  },
  secondary: {
    main: '#990000',
    light: '#c92a2a'
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0,0,0,0.87)',
    secondary: 'rgba(0,0,0,0.6)',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  primary: {
    main: '#990000',
    light: '#c92a2a',
  },
  secondary: {
    main: '#990000',
    light: '#c92a2a'
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: 'rgba(255,255,255,0.87)',
    secondary: 'rgba(255,255,255,0.6)',
  },
};

const typography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.rem',
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
};

const spacing = 8;

const shadows: ThemeOptions['shadows'] = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.05),0px 1px 3px 0px rgba(0,0,0,0.05)',
  '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.05),0px 1px 8px 0px rgba(0,0,0,0.05)',
  'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none',
] as ThemeOptions['shadows'];

(shadows as NonNullable<typeof shadows>).length = 25;

const transitions = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
  },
};

const components: ThemeOptions['components'] = {
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
        backgroundColor: '#333333', // This will be overridden in _app.tsx
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
};

const themeConfig = {
  light: {
    palette: lightPalette,
    typography: typography,
    spacing: spacing,
    shadows: shadows,
    transitions: transitions,
    components: components,
  },
  dark: {
    palette: darkPalette,
    typography: typography,
    spacing: spacing,
    shadows: shadows,
    transitions: transitions,
    components: components,
  },
} as const;

export default themeConfig;
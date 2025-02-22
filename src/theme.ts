import type { ThemeOptions } from '@mui/material/styles';
import { PaletteMode, PaletteOptions, PaletteColorOptions, Color, useMediaQuery } from '@mui/material';

// Define a specific type for palette colors
interface MyPaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

interface CustomPaletteOptions extends PaletteOptions {
  accent?: PaletteColorOptions;
  primary: MyPaletteColor;
  secondary: MyPaletteColor;
  mode: PaletteMode;
}

// Modern and Sleek Color Palette
const lightPalette: CustomPaletteOptions = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#007BFF',
    light: '#33ACFF',
    dark: '#0052CC',
    contrastText: '#fff',
  },
  secondary: {
    main: '#6C757D',
    light: '#A7ACB1',
    dark: '#4D5154',
    contrastText: '#fff',
  },
  background: {
    default: '#F8F9FA',
    paper: '#FFFFFF',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
  accent: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FFA000',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: '#F44336',
  },
  warning: {
    main: '#FF9800',
  },
  info: {
    main: '#2196F3',
  },
  success: {
    main: '#4CAF50',
  },
};

const darkPalette: CustomPaletteOptions = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: '#007BFF',
    light: '#33ACFF',
    dark: '#0052CC',
    contrastText: '#fff',
  },
  secondary: {
    main: '#A7ACB1',
    light: '#D3D5D8',
    dark: '#777B7E',
    contrastText: '#fff',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.95)',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
  accent: {
    main: '#FFD740',
    light: '#FFEE58',
    dark: '#FFC107',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: '#F44336',
  },
  warning: {
    main: '#FF9800',
  },
  info: {
    main: '#29B6F6',
  },
  success: {
    main: '#66BB6A',
  },
};

const typography: ThemeOptions['typography'] = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '3.0rem',
    marginBottom: '1.2rem',
    letterSpacing: '-0.02em',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.4rem',
    marginBottom: '1rem',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '2.0rem',
    marginBottom: '0.8rem',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.8rem',
    marginBottom: '0.7rem',
  },
  h5: {
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  h6: {
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1.0rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    fontStyle: 'normal',
  },
  subtitle1: {
    fontSize: '1.1rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  subtitle2: {
    fontSize: '0.9rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  overline: {
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: '"Roboto Mono", monospace',
    fontSize: '0.9rem',
    backgroundColor: darkPalette.background?.paper,
    color: darkPalette.text?.primary,
    padding: '0.2rem 0.5rem',
    borderRadius: 4,
  },
};

const spacing = 8;

const shadows: ThemeOptions['shadows'] = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.02),0px 1px 1px 0px rgba(0,0,0,0.014),0px 1px 3px 0px rgba(0,0,0,0.012)',
  '0px 3px 1px -2px rgba(0,0,0,0.04),0px 2px 2px 0px rgba(0,0,0,0.028),0px 1px 5px 0px rgba(0,0,0,0.024)',
  '0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.032)',
  '0px 2px 4px -1px rgba(0,0,0,0.08),0px 4px 5px 0px rgba(0,0,0,0.056),0px 1px 10px 0px rgba(0,0,0,0.04)',
  '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.048)',
  '0px 3px 5px -1px rgba(0,0,0,0.12),0px 6px 10px 0px rgba(0,0,0,0.084),0px 1px 18px 0px rgba(0,0,0,0.056)',
  '0px 4px 5px -2px rgba(0,0,0,0.14),0px 7px 10px 1px rgba(0,0,0,0.098),0px 2px 16px 1px rgba(0,0,0,0.08)',
  '0px 5px 6px -3px rgba(0,0,0,0.16),0px 8px 12px 1px rgba(0,0,0,0.112),0px 3px 18px 1px rgba(0,0,0,0.1)',
  '0px 6px 6px -3px rgba(0,0,0,0.18),0px 9px 14px 1px rgba(0,0,0,0.126),0px 3px 20px 1px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 10px 15px 1px rgba(0,0,0,0.14),0px 4px 22px 1px rgba(0,0,0,0.14)',
  '0px 7px 8px -4px rgba(0,0,0,0.22),0px 11px 17px 1px rgba(0,0,0,0.154),0px 4px 24px 1px rgba(0,0,0,0.16)',
  '0px 7px 8px -4px rgba(0,0,0,0.24),0px 12px 17px 2px rgba(0,0,0,0.168),0px 5px 26px 2px rgba(0,0,0,0.18)',
  '0px 8px 9px -5px rgba(0,0,0,0.26),0px 13px 19px 2px rgba(0,0,0,0.182),0px 5px 28px 2px rgba(0,0,0,0.2)',
  '0px 8px 9px -5px rgba(0,0,0,0.28),0px 14px 21px 2px rgba(0,0,0,0.196),0px 5px 30px 2px rgba(0,0,0,0.22)',
  '0px 9px 10px -5px rgba(0,0,0,0.3),0px 15px 22px 2px rgba(0,0,0,0.21),0px 6px 32px 2px rgba(0,0,0,0.24)',
  '0px 9px 10px -5px rgba(0,0,0,0.32),0px 16px 24px 2px rgba(0,0,0,0.224),0px 6px 34px 2px rgba(0,0,0,0.26)',
  '0px 10px 11px -5px rgba(0,0,0,0.34),0px 17px 25px 2px rgba(0,0,0,0.238),0px 6px 36px 2px rgba(0,0,0,0.28)',
  '0px 10px 11px -5px rgba(0,0,0,0.36),0px 18px 26px 2px rgba(0,0,0,0.252),0px 7px 38px 2px rgba(0,0,0,0.3)',
  '0px 11px 12px -6px rgba(0,0,0,0.38),0px 19px 28px 2px rgba(0,0,0,0.266),0px 7px 40px 2px rgba(0,0,0,0.32)',
  '0px 11px 12px -6px rgba(0,0,0,0.4),0px 20px 29px 2px rgba(0,0,0,0.28),0px 7px 42px 2px rgba(0,0,0,0.34)',
  '0px 12px 13px -6px rgba(0,0,0,0.42),0px 21px 31px 2px rgba(0,0,0,0.294),0px 8px 44px 2px rgba(0,0,0,0.36)',
  '0px 12px 13px -6px rgba(0,0,0,0.44),0px 22px 32px 2px rgba(0,0,0,0.308),0px 8px 46px 2px rgba(0,0,0,0.38)',
  '0px 13px 14px -7px rgba(0,0,0,0.46),0px 23px 34px 2px rgba(0,0,0,0.322),0px 8px 48px 2px rgba(0,0,0,0.4)',
  '0px 14px 15px -7px rgba(0,0,0,0.48),0px 24px 35px 2px rgba(0,0,0,0.336),0px 9px 50px 2px rgba(0,0,0,0.42)',
] as ThemeOptions['shadows'];

(shadows as NonNullable<typeof shadows>).length = 25;

const transitions = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    shortest: 100,
    shorter: 150,
    short: 200,
    standard: 250,
    complex: 375,
    enteringScreen: 300,
    leavingScreen: 225,
  },
};

const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: lightPalette.background?.default,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: lightPalette.primary.dark,
        },
      },
      containedPrimary: {
        color: lightPalette.primary.contrastText,
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
      position: 'fixed',
    },
    styleOverrides: {
      root: {
        backgroundColor: lightPalette.background?.paper,
        color: lightPalette.text?.primary,
        borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 64,
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'hover',
    },
    styleOverrides: {
      root: {
        color: lightPalette.primary?.main,
        fontWeight: 500,
        '&:hover': {
          color: lightPalette.primary?.dark,
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 500,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 1,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        backgroundColor: lightPalette.background?.paper,
      },
    },
  },
   MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: lightPalette.background?.paper,
      }
    }
  },
  MuiDialog: {
    defaultProps: {
      PaperProps: {
        elevation: 0,
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: 12,
      },
    },
  },
  MuiMenu: {
    defaultProps: {
      PaperProps: {
        elevation: 1,
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: 8,
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      maxWidthMd: {
        maxWidth: '1000px',
      },
    },
  },
};

// Theme configuration object
// Function to determine theme based on system preference
const themeConfig = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return {
    palette: prefersDarkMode ? darkPalette : lightPalette,
    typography: typography,
    spacing: spacing,
    shadows: shadows,
    transitions: transitions,
    components: components,
  } as const;
};

export default themeConfig;
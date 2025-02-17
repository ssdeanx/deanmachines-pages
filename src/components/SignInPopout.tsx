import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Divider,
  useTheme,
  styled,
} from '@mui/material';
import { Close as CloseIcon, GitHub as GitHubIcon, Google as GoogleIcon } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { Error } from '../types/error';

interface SignInPopoutProps {
  open: boolean;
  onClose: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

const SignInPopout: React.FC<SignInPopoutProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (providerId: string) => {
    setSignInError(null);
    await signIn(providerId, { callbackUrl: '/' });
  };

  const handleEmailSignIn = async () => {
    setSignInError(null);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    if (result?.error) {
      setSignInError(result.error);
    } else {
      onClose();
      router.refresh();
    }
  };

  const handleSignUp = async () => {
    setSignUpError(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/',
        });
        if (signInResult?.error) {
          setSignInError(signInResult.error);
        } else {
          onClose();
          router.refresh();
        }
      } else {
        const errorData = await response.json();
        setSignUpError(errorData.message || 'Sign-up failed');
      }
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSignUpError(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', p: 2 }}>
          {isSignUp && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!signInError || !!signUpError}
            helperText={isSignUp ? signUpError : signInError}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!signInError || !!signUpError}
            helperText={isSignUp ? signUpError : signInError}
          />

          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={isSignUp ? handleSignUp : handleEmailSignIn}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </StyledButton>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Typography variant="body2" align="center">
            Or sign in with
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={() => handleSignIn('google')} aria-label="Sign in with Google">
              <GoogleIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <IconButton onClick={() => handleSignIn('github')} aria-label="Sign in with GitHub">
              <GitHubIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>

          <Button color="secondary" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignInPopout; 
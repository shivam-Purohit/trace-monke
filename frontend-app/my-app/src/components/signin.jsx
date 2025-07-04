import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';

const providers = [
  { id: 'github', name: 'GitHub', icon: <GitHubIcon /> },
  { id: 'google', name: 'Google', icon: <GoogleIcon /> },
  { id: 'credentials', name: 'Email and Password', icon: <LoginIcon /> },
];

const signIn = async (provider, credentials = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`, credentials);
      resolve({ error: provider.id === 'credentials' ? 'Mock error: invalid credentials.' : null });
    }, 500);
  });
};

export default function SignInPage() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleProviderSignIn = async (provider) => {
    const result = await signIn(provider, provider.id === 'credentials' ? formValues : null);
    if (result.error) setError(result.error);
    else alert(`Signed in with ${provider.name}`);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" gutterBottom align="center">
            Sign In to Trace Bunny
          </Typography>

          <Stack spacing={2} mt={3}>
            {providers
              .filter((p) => p.id !== 'credentials')
              .map((provider) => (
                <Button
                  key={provider.id}
                  fullWidth
                  variant="outlined"
                  startIcon={provider.icon}
                  onClick={() => handleProviderSignIn(provider)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}

            <Typography variant="body2" align="center" color="text.secondary">
              OR
            </Typography>

            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              type="email"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              type="password"
              fullWidth
              required
            />
            <Button
              variant="contained"
              onClick={() => handleProviderSignIn({ id: 'credentials', name: 'Email and Password' })}
            >
              Sign in
            </Button>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1674811564431-4be5bd37fb6a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Trace Bunny
        </Typography>
        <Typography variant="h5" maxWidth="md">
          Supercharge your LLM apps with real-time tracing, evaluations, and prompt engineering insights — all in one platform.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4, backgroundColor: '#1976d2', fontWeight: 'bold' }}
          size="large"
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 4, backgroundColor: '#f4f6f8',
        //   backgroundImage: `url('https://plus.unsplash.com/premium_photo-1674811564431-4be5bd37fb6a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',     
      }}>
        <Typography variant="h4" textAlign="center" fontWeight={600} gutterBottom>
          Powerful Features to Boost Your LLM Stack
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <TrackChangesIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <Typography variant="h6" fontWeight={600} mt={2}>
                  Tracing
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Monitor every step of your LLM pipelines — from input to output — with full visibility and traceability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <FactCheckIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <Typography variant="h6" fontWeight={600} mt={2}>
                  Evaluations
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Auto-evaluate responses with custom metrics or LLM-based scoring to ensure consistent quality and relevance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <SettingsSuggestIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <Typography variant="h6" fontWeight={600} mt={2}>
                  Prompt Engineering
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  A/B test prompts, optimize chaining logic, and streamline your development workflow with prompt version control.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;

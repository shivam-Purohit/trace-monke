import React from 'react';
import { Box, Typography, IconButton, Grid, Link } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        py: 4,
        px: { xs: 2, sm: 4 },
        mt: 8,
      }}
    >
      <Grid container spacing={3} justifyContent="space-between">
        {/* Logo + Description */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Trace Bunny
          </Typography>
          <Typography variant="body2">
            Observability and evaluation tools for your LLM pipelines. Stay in control and iterate with confidence.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="#about" underline="hover" color="inherit" display="block">
              About
            </Link>
            <Link href="#pricing" underline="hover" color="inherit" display="block">
              Pricing
            </Link>
            <Link href="#docs" underline="hover" color="inherit" display="block">
              Docs
            </Link>
            <Link href="#contact" underline="hover" color="inherit" display="block">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Socials */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#1DA1F2' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://github.com/yourrepo"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#c9d1d9' }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/yourprofile/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#0A66C2' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center" borderTop="1px solid #30363d" pt={2}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Trace Bunny. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;

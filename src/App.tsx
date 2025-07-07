import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, AppBar, Toolbar, Grid, Container } from '@mui/material';
import MainInfo from './components/MainInfo';
import FinancialStatements from './components/FinancialStatements';
import BullBearDebate from './components/BullBearDebate';
import ChartSection from './components/ChartSection';
import PeerComparison from './components/PeerComparison';
import NewsDocuments from './components/NewsDocuments';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0071e3', // Apple blue
    },
    secondary: {
      main: '#1db954', // Apple green
    },
    background: {
      default: '#fff',
      paper: '#f5f5f7',
    },
    text: {
      primary: '#111',
      secondary: '#888',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', height: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ background: '#fff', color: '#111', borderBottom: '1px solid #e0e0e0' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
              Apple Dashboard Prototype
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <MainInfo />
              </Box>
              <Box sx={{ mb: 3 }}>
                <FinancialStatements />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ mb: 3 }}>
                <BullBearDebate />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <ChartSection />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <PeerComparison />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <NewsDocuments />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 
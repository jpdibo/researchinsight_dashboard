import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper
} from '@mui/material';
import { TrendingUp, TrendingDown, Psychology, Info } from '@mui/icons-material';

const BullBearDebate: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const bullArguments = [
    "Apple's premium valuation (NTM P/E 28x vs. 5yr avg 24x) reflects the strength and resilience of its ecosystem, with high customer loyalty and recurring revenue streams.",
    "Services and wearables are driving margin expansion and diversifying revenue beyond hardware, supporting long-term growth.",
    "$100B+ annual FCF enables significant buybacks and dividend growth, returning value to shareholders.",
    "iPhone, Mac, and Services segments continue to outperform peers in both growth and profitability.",
    "Net cash position remains strong, supporting flexibility for M&A and continued innovation."
  ];

  const bearArguments = [
    "Valuation multiples (NTM P/E 28x) are 17% above 5yr avg (24x), raising risk of mean reversion if growth disappoints.",
    "Revenue growth has slowed to low single digits, with 2023 revenue -2.8% y/y, and consensus expects only modest acceleration.",
    "China exposure and regulatory risks could pressure both top-line and margins, especially in Services.",
    "Competition in wearables and services is intensifying, potentially capping further margin expansion.",
    "Buyback pace may slow as net cash position declines and interest rates remain elevated."
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ width: '100%', height: '100%', mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff' }}>
      <CardContent sx={{ p: 2, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            Bull vs Bear Debate
          </Typography>
          <Chip
            icon={<Psychology />}
            label="AI-Generated"
            color="primary"
            variant="outlined"
            onClick={handleOpenDialog}
            sx={{ cursor: 'pointer' }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #4caf50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" color="success.main" fontWeight="bold">
                  Bull Case
                </Typography>
              </Box>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {bullArguments.map((argument, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, lineHeight: 1.6 }}
                  >
                    {argument}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #f44336' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDown sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" color="error.main" fontWeight="bold">
                  Bear Case
                </Typography>
              </Box>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {bearArguments.map((argument, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, lineHeight: 1.6 }}
                  >
                    {argument}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <Info sx={{ mr: 1, fontSize: 16 }} />
            This analysis is generated using AI algorithms that analyze financial data, market trends, and company fundamentals. 
            Click the "AI-Generated" badge above for more information.
          </Typography>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <Psychology sx={{ mr: 1, color: 'primary.main' }} />
            AI-Generated Analysis
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              This bull vs bear analysis is generated using advanced artificial intelligence algorithms that process:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Historical financial performance data
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Industry trends and competitive analysis
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Market sentiment and analyst reports
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Economic indicators and macro factors
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Company-specific news and developments
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              The analysis is updated regularly and should be used as one of many tools in your investment decision-making process.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BullBearDebate; 
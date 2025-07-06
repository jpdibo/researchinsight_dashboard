import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Avatar } from '@mui/material';
import { TrendingUp, Business, AttachMoney } from '@mui/icons-material';
import AppleIcon from '@mui/icons-material/Apple';

const mainInfoStyles = {
  card: {
    width: '100%',
    borderRadius: 4,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    background: '#fff',
    border: '1px solid #e0e0e0',
    p: 1.5,
    m: 0,
  },
  avatar: {
    bgcolor: '#000',
    width: 36,
    height: 36,
    mr: 1.5,
  },
  logo: {
    color: '#111',
    fontSize: 32,
    mr: 1.5,
  },
  label: {
    color: '#888',
    fontWeight: 500,
    fontSize: 12,
  },
  value: {
    fontWeight: 600,
    fontSize: 14,
    color: '#222',
  },
  upside: {
    color: '#1db954',
    fontWeight: 600,
    fontSize: 13,
    ml: 1,
  },
  chip: {
    fontWeight: 500,
    fontSize: 11,
    bgcolor: '#f5f5f7',
    color: '#222',
    border: '1px solid #e0e0e0',
    mr: 0.5,
  },
};

const MainInfo: React.FC = () => {
  // Apple Inc. mock data (as of early 2024, for demo)
  const companyData = {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    sector: 'Technology',
    marketCap: '$2.8T',
    sharePrice: '$195.50',
    adv: '$10.2B',
    ntmPE: '28.1',
    ntmEVSales: '7.2x',
    ntmEVEBITDA: '21.5x',
    ltmROE: '148%',
    opMargin: '30%',
    opMargin5yr: '29%',
    shareholderYield: '2.3%',
    sellSideTarget: '$210/shr. (78% of Sell-side buys)',
    upside: '+7.4%',
    lastUpdate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  };

  // Calculate upside or downside for sell-side target
  const sharePriceNum = 195.50;
  const targetNum = 210.00;
  const upsideNum = ((targetNum - sharePriceNum) / sharePriceNum) * 100;
  const upsideText = upsideNum >= 0 ? `+${upsideNum.toFixed(1)}%` : `${upsideNum.toFixed(1)}%`;
  const upsideColor = upsideNum >= 0 ? '#1db954' : '#d32f2f';

  return (
    <Card sx={mainInfoStyles.card}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AppleIcon sx={mainInfoStyles.logo} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111', mb: 0 }}>
              {companyData.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip label={companyData.ticker} sx={{ ...mainInfoStyles.chip, bgcolor: '#0071e3', color: '#fff' }} size="small" />
              <Chip label={companyData.sector} sx={mainInfoStyles.chip} size="small" />
            </Box>
          </Box>
        </Box>
        <Grid container spacing={0.5}>
          {/* Right side indicators */}
          <Grid item xs={6}>
            <Typography sx={mainInfoStyles.label}>Share Price</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.sharePrice}</Typography>
            <Typography sx={mainInfoStyles.label}>Market Cap</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.marketCap}</Typography>
            <Typography sx={mainInfoStyles.label}>ADV</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.adv}</Typography>
            <Typography sx={mainInfoStyles.label}>Shareholder Yield (Dividends + Buybacks)</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.shareholderYield}</Typography>
            <Typography sx={mainInfoStyles.label}>Avg. Sell-side Target</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={mainInfoStyles.value}>$210/shr. (78% of Sell-side buys)</Typography>
              <Typography sx={{ ...mainInfoStyles.upside, color: upsideColor, ml: 1 }}>{upsideText}</Typography>
            </Box>
            <Typography sx={mainInfoStyles.label}>Sector</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.sector}</Typography>
          </Grid>
          {/* Left side indicators */}
          <Grid item xs={6}>
            <Typography sx={mainInfoStyles.label}>NTM P/E</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.ntmPE}</Typography>
            <Typography sx={mainInfoStyles.label}>NTM EV/Sales</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.ntmEVSales}</Typography>
            <Typography sx={mainInfoStyles.label}>NTM EV/EBITDA</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.ntmEVEBITDA}</Typography>
            <Typography sx={mainInfoStyles.label}>LTM ROE</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.ltmROE}</Typography>
            <Typography sx={mainInfoStyles.label}>Operating Margin</Typography>
            <Typography sx={mainInfoStyles.value}>{companyData.opMargin} <span style={{ color: '#888', fontWeight: 400 }}>(avg {companyData.opMargin5yr} last 5y)</span></Typography>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ color: '#888', mt: 1, display: 'block', textAlign: 'right' }}>
          Last update: {companyData.lastUpdate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MainInfo; 
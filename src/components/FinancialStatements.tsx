import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import Popover from '@mui/material/Popover';

interface FinancialData {
  [key: string]: {
    [year: string]: number | string;
  };
}

const FinancialStatements: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverValue, setPopoverValue] = useState<string>('');

  // Mock financial data - replace with actual data
  const financialData: FinancialData = {
    'Revenue': {
      '2020': 274515,
      '2021': 365817,
      '2022': 394328,
      '2023': 383285,
      '2024E': 400000,
      '2025E': 420000,
      '2026E': 440000
    },
    'Revenue y/y': {
      '2020': '5.5%',
      '2021': '33.3%',
      '2022': '7.8%',
      '2023': '-2.8%',
      '2024E': '4.4%',
      '2025E': '5.0%',
      '2026E': '4.8%'
    },
    'Gross profit': {
      '2020': 104956,
      '2021': 152836,
      '2022': 170782,
      '2023': 162024,
      '2024E': 170000,
      '2025E': 180000,
      '2026E': 190000
    },
    'Gross profit y/y': {
      '2020': '6.7%',
      '2021': '45.7%',
      '2022': '11.8%',
      '2023': '-5.1%',
      '2024E': '4.9%',
      '2025E': '5.9%',
      '2026E': '5.6%'
    },
    'Gross margin %': {
      '2020': '38.2%',
      '2021': '41.8%',
      '2022': '43.3%',
      '2023': '42.3%',
      '2024E': '42.5%',
      '2025E': '42.9%',
      '2026E': '43.2%'
    },
    'Operating Profit, Adj.': {
      '2020': 66288,
      '2021': 108949,
      '2022': 119437,
      '2023': 114304,
      '2024E': 120000,
      '2025E': 126000,
      '2026E': 132000
    },
    'Operating Profit, Adj. y/y': {
      '2020': '4.7%',
      '2021': '64.4%',
      '2022': '9.6%',
      '2023': '-4.3%',
      '2024E': '5.0%',
      '2025E': '5.0%',
      '2026E': '4.8%'
    },
    'Operating Margin %': {
      '2020': '24.1%',
      '2021': '29.8%',
      '2022': '30.3%',
      '2023': '29.8%',
      '2024E': '30.0%',
      '2025E': '30.0%',
      '2026E': '30.0%'
    },
    'EPS': {
      '2020': 3.28,
      '2021': 5.67,
      '2022': 6.11,
      '2023': 6.13,
      '2024E': 6.50,
      '2025E': 7.00,
      '2026E': 7.50
    },
    'EPS y/y': {
      '2020': '10.4%',
      '2021': '72.9%',
      '2022': '7.8%',
      '2023': '0.3%',
      '2024E': '6.0%',
      '2025E': '7.7%',
      '2026E': '7.1%'
    },
    'Op. CF': {
      '2020': 80067,
      '2021': 104038,
      '2022': 122151,
      '2023': 110543,
      '2024E': 115000,
      '2025E': 120000,
      '2026E': 125000
    },
    'CAPEX': {
      '2020': 7309,
      '2021': 11085,
      '2022': 10708,
      '2023': 10804,
      '2024E': 11000,
      '2025E': 11500,
      '2026E': 12000
    },
    'FCF': {
      '2020': 72758,
      '2021': 92953,
      '2022': 111443,
      '2023': 99739,
      '2024E': 104000,
      '2025E': 108500,
      '2026E': 113000
    },
    'Net Debt': {
      '2020': -79639,
      '2021': -79665,
      '2022': -54067,
      '2023': -57000,
      '2024E': -60000,
      '2025E': -65000,
      '2026E': -70000
    },
    'Net Debt/EBITDA': {
      '2020': '-1.0x',
      '2021': '-0.9x',
      '2022': '-0.6x',
      '2023': '-0.6x',
      '2024E': '-0.6x',
      '2025E': '-0.7x',
      '2026E': '-0.7x'
    }
  };

  const years = [
    { key: '2020', label: 'FY20' },
    { key: '2021', label: 'FY21' },
    { key: '2022', label: 'FY22' },
    { key: '2023', label: 'FY23' },
    { key: '2024E', label: 'FY24E' },
    { key: '2025E', label: 'FY25E' },
    { key: '2026E', label: 'FY26E' }
  ];
  const metrics = [
    'Revenue', 'Revenue y/y', 'Gross profit', 'Gross profit y/y', 'Gross margin %',
    'Operating Profit, Adj.', 'Operating Profit, Adj. y/y', 'Operating Margin %',
    'EPS', 'EPS y/y', 'Op. CF', 'CAPEX', 'FCF', 'Net Debt', 'Net Debt/EBITDA'
  ];

  const formatNumber = (value: number | string, metric: string): string => {
    if (typeof value === 'string') return value;
    if (metric.includes('margin') || metric.includes('y/y')) {
      return value + '%';
    } else if (metric === 'EPS') {
      return `$${value.toFixed(2)}`;
    } else if (metric.includes('Debt/EBITDA')) {
      return value + 'x';
    } else {
      return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  };

  const handleCopyAll = async () => {
    let text = 'Metric\t' + years.map(year => year.label).join('\t') + '\n';
    metrics.forEach(metric => {
      text += metric + '\t' + years.map(year => formatNumber(financialData[metric][year.key], metric)).join('\t') + '\n';
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField('all');
      setShowSnackbar(true);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const isItalic = (metric: string): boolean => {
    return metric.includes('margin') || metric.includes('y/y');
  };

  const handleCellClick = (event: React.MouseEvent<HTMLElement>, value: string) => {
    setAnchorEl(event.currentTarget);
    setPopoverValue(value);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverValue('');
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff', width: '100%' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Button variant="outlined" color="primary" size="small" sx={{ mb: 1, fontWeight: 700 }} href="#" target="_blank">Use our valuation tool</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111' }}>
              Financial Statements
            </Typography>
            <Typography variant="caption" sx={{ color: '#888', fontSize: 13, ml: 0.5 }}>
              FYE-Dec, $m
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<ContentCopy />}
            onClick={handleCopyAll}
            sx={{ bgcolor: '#f5f5f7', color: '#0071e3', borderRadius: 2, fontWeight: 600, boxShadow: 'none', border: '1px solid #e0e0e0', ':hover': { bgcolor: '#e0e0e0' } }}
          >
            Copy to Excel
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'black', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption" sx={{ color: 'black', mr: 2 }}>Actual</Typography>
          <Box sx={{ width: 16, height: 16, bgcolor: 'blue', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption" sx={{ color: 'blue' }}>Estimate</Typography>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 2, width: '100%' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', minWidth: 120, background: '#f5f5f7', color: '#111' }}>Metric</TableCell>
                {years.map((year) => (
                  <TableCell key={year.key} align="center" sx={{ fontWeight: 'bold', minWidth: 70, background: '#f5f5f7', color: '#111' }}>
                    {year.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow key={metric} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 'bold',
                      fontStyle: metric.includes('margin') || metric.includes('y/y') ? 'italic' : 'normal',
                      color: '#222',
                      background: '#fff',
                      pl: metric.includes('margin') || metric.includes('y/y') ? 4 : 2
                    }}
                  >
                    {metric}
                  </TableCell>
                  {years.map((year) => {
                    const value = financialData[metric][year.key];
                    const formattedValue = formatNumber(value, metric);
                    const isEstimate = year.key === '2025E' || year.key === '2026E';
                    return (
                      <TableCell
                        key={year.key}
                        align="center"
                        sx={{
                          background: '#fff',
                          color: isEstimate ? 'blue' : 'black',
                          cursor: isEstimate ? 'pointer' : 'default',
                          transition: 'background 0.2s',
                          '&:hover': isEstimate ? { background: '#e3f2fd' } : undefined
                        }}
                        onClick={isEstimate ? (e) => handleCellClick(e, formattedValue) : undefined}
                      >
                        <Typography
                          sx={{
                            fontStyle: metric.includes('margin') || metric.includes('y/y') ? 'italic' : 'normal',
                            color: isEstimate ? 'blue' : 'black',
                            fontSize: 14,
                          }}
                        >
                          {formattedValue}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Value: <b>{popoverValue}</b>
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => { handlePopoverClose(); alert('Navigate to chart estimates over time (not implemented)'); }}
            >
              Chart estimates over time
            </Button>
          </Box>
        </Popover>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default FinancialStatements; 
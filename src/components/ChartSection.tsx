import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  Scatter
} from 'recharts';
import { Add, Settings } from '@mui/icons-material';

interface ChartData {
  date: string;
  sharePrice: number;
  ntPE: number;
  ntEPS: number;
  shortInterest: number;
  rsi: number;
  sellSideBuys: number;
  avgTarget: number;
}

const weeklyData: ChartData[] = Array.from({ length: 105 }, (_, i) => {
  const week = i;
  const date = new Date(2023, 6, 1 + week * 7); // July is month 6 (0-indexed)
  const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return {
    date: label,
    sharePrice: 140 + Math.sin(i / 8) * 10 + i * 0.5,
    ntPE: 22 + Math.cos(i / 10) * 2 + i * 0.02,
    ntEPS: 6 + Math.sin(i / 12) * 0.5 + i * 0.01,
    shortInterest: 0.5 + Math.abs(Math.sin(i / 15)) * 2,
    rsi: 40 + Math.abs(Math.sin(i / 7)) * 30,
    sellSideBuys: 60 + Math.sin(i / 20) * 10,
    avgTarget: 180 + Math.sin(i / 16) * 8 + i * 0.2
  };
});

const axisOptions = [
  { value: 'sharePrice', label: 'Share Price (LHS)', color: '#0071e3', axis: 'left' },
  { value: 'ntPE', label: 'NTM P/E (RHS1)', color: '#1db954', axis: 'right1' },
  { value: 'ntEPS', label: 'NTM EPS (RHS2)', color: '#ff9800', axis: 'right2' },
  { value: 'shortInterest', label: 'Short Interest as % of Free Float', color: '#e53935', axis: 'right2' },
  { value: 'rsi', label: 'RSI', color: '#8e24aa', axis: 'right2' },
  { value: 'sellSideBuys', label: '% of Sell-side buys', color: '#3949ab', axis: 'right2' },
  { value: 'avgTarget', label: 'Average sell-side price target', color: '#00bcd4', axis: 'right2' },
];

const getDomain = (data: ChartData[], key: keyof ChartData) => {
  const values = data.map(d => d[key] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) * 0.1;
  return [Math.floor(min - padding), Math.ceil(max + padding)];
};

const ChartSection: React.FC = () => {
  const [xAxis] = useState<string>('date');
  const [yAxis1, setYAxis1] = useState<string>('sharePrice');
  const [yAxis2, setYAxis2] = useState<string>('ntPE');
  const [yAxis3, setYAxis3] = useState<string>('ntEPS');
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [defaultKPIs, setDefaultKPIs] = useState({ yAxis1: 'sharePrice', yAxis2: 'ntPE', yAxis3: 'ntEPS' });

  const getAxisLabel = (value: string): string => {
    const option = axisOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  const getAxisColor = (value: string): string => {
    const option = axisOptions.find(opt => opt.value === value);
    return option ? option.color : '#8884d8';
  };

  const getLegendAxis = (metric: string) => {
    if (metric === yAxis1) return ' (LHS)';
    if (metric === yAxis2) return ' (RHS1)';
    if (metric === yAxis3) return ' (RHS2)';
    return '';
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111', flexGrow: 1 }}>
            Interactive Chart
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Settings />}
            onClick={() => setCustomizeOpen(true)}
            sx={{ borderRadius: 2, fontWeight: 600, color: '#0071e3', border: '1px solid #0071e3', ml: 1 }}
          >
            Customizable
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 2, bgcolor: '#1db954', color: '#fff', fontWeight: 600, borderRadius: 2 }}
            onClick={() => setDefaultKPIs({ yAxis1, yAxis2, yAxis3 })}
          >
            Save as Default
          </Button>
        </Box>
        <Box sx={{ height: 340, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData} margin={{ top: 20, right: 60, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis yAxisId="left" stroke={getAxisColor(yAxis1)} domain={getDomain(weeklyData, yAxis1 as keyof ChartData)} />
              <YAxis yAxisId="right1" orientation="right" stroke={getAxisColor(yAxis2)} domain={getDomain(weeklyData, yAxis2 as keyof ChartData)} />
              <YAxis yAxisId="right2" orientation="right" stroke={getAxisColor(yAxis3)} domain={getDomain(weeklyData, yAxis3 as keyof ChartData)} />
              <Tooltip />
              <Legend formatter={(value) => `${getAxisLabel(value)}${getLegendAxis(value)}`} />
              <Line yAxisId="left" type="monotone" dataKey={yAxis1} stroke={getAxisColor(yAxis1)} name={getAxisLabel(yAxis1)} dot={false} strokeWidth={2.5} />
              <Line yAxisId="right1" type="monotone" dataKey={yAxis2} stroke={getAxisColor(yAxis2)} name={getAxisLabel(yAxis2)} dot={false} strokeWidth={2.5} />
              <Line yAxisId="right2" type="monotone" dataKey={yAxis3} stroke={getAxisColor(yAxis3)} name={getAxisLabel(yAxis3)} dot={false} strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Dialog open={customizeOpen} onClose={() => setCustomizeOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Customize Chart Axes</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Y-Axis (LHS)</InputLabel>
                  <Select
                    value={yAxis1}
                    label="Y-Axis (LHS)"
                    onChange={(e) => setYAxis1(e.target.value)}
                  >
                    {axisOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Y-Axis (RHS1)</InputLabel>
                  <Select
                    value={yAxis2}
                    label="Y-Axis (RHS1)"
                    onChange={(e) => setYAxis2(e.target.value)}
                  >
                    {axisOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Y-Axis (RHS2)</InputLabel>
                  <Select
                    value={yAxis3}
                    label="Y-Axis (RHS2)"
                    onChange={(e) => setYAxis3(e.target.value)}
                  >
                    {axisOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCustomizeOpen(false)} color="primary" variant="contained">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ChartSection; 
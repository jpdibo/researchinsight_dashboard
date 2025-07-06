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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface PeerData {
  name: string;
  marketCap: string;
  adv: string;
  epsFY1: string;
  epsFY2: string;
  peFY1: string;
  peFY2: string;
  [key: string]: string; // For dynamic columns
}

interface Column {
  id: string;
  label: string;
  type: 'text' | 'number' | 'percentage';
}

// Mock peer data generator for Apple sector
const mockPeerData = (name: string): PeerData => {
  // In a real app, this would fetch from an API
  const templates: PeerData[] = [
    {
      name: 'Apple Inc.',
      marketCap: '$2.8T',
      adv: '$10.2B',
      epsFY1: '6.50',
      epsFY2: '7.00',
      peFY1: '28.1',
      peFY2: '26.0'
    },
    {
      name: 'Microsoft Corp.',
      marketCap: '$2.7T',
      adv: '$8.5B',
      epsFY1: '11.20',
      epsFY2: '12.10',
      peFY1: '32.0',
      peFY2: '29.5'
    },
    {
      name: 'Alphabet Inc.',
      marketCap: '$1.8T',
      adv: '$5.7B',
      epsFY1: '7.80',
      epsFY2: '8.50',
      peFY1: '25.0',
      peFY2: '23.0'
    },
    {
      name: 'Meta Platforms',
      marketCap: '$1.1T',
      adv: '$4.2B',
      epsFY1: '17.50',
      epsFY2: '19.00',
      peFY1: '22.0',
      peFY2: '20.5'
    }
  ];
  return templates.find(p => p.name.toLowerCase() === name.toLowerCase()) || {
    name,
    marketCap: '$100B',
    adv: '$1.0B',
    epsFY1: '2.00',
    epsFY2: '2.20',
    peFY1: '20.0',
    peFY2: '18.0'
  };
};

const PeerComparison: React.FC = () => {
  const [peers, setPeers] = useState<PeerData[]>([
    mockPeerData('Apple Inc.'),
    mockPeerData('Microsoft Corp.'),
    mockPeerData('Alphabet Inc.'),
    mockPeerData('Meta Platforms')
  ]);

  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'marketCap', label: 'Market Cap', type: 'text' },
    { id: 'adv', label: 'ADV', type: 'text' },
    { id: 'epsFY1', label: 'EPS FY+1 y/y', type: 'percentage' },
    { id: 'epsFY2', label: 'EPS FY+2 y/y', type: 'percentage' },
    { id: 'peFY1', label: 'P/E FY+1', type: 'number' },
    { id: 'peFY2', label: 'P/E FY+2', type: 'number' }
  ]);

  const [openAddColumn, setOpenAddColumn] = useState(false);
  const [openAddPeer, setOpenAddPeer] = useState(false);
  const [newColumn, setNewColumn] = useState({ id: '', label: '', type: 'text' as const });
  const [newPeerName, setNewPeerName] = useState('');

  const peerTickers: Record<string, string> = {
    'Apple Inc.': 'AAPL',
    'Microsoft Corp.': 'MSFT',
    'Alphabet Inc.': 'GOOGL',
    'Meta Platforms': 'META',
    'Amazon.com Inc.': 'AMZN',
  };

  const [defaultColumns, setDefaultColumns] = useState(columns.map(col => col.id));

  const handleAddColumn = () => {
    if (newColumn.id && newColumn.label) {
      setColumns([...columns, newColumn]);
      setPeers(peers.map(peer => ({ ...peer, [newColumn.id]: '' })));
      setNewColumn({ id: '', label: '', type: 'text' });
      setOpenAddColumn(false);
    }
  };

  const handleAddPeer = () => {
    if (newPeerName) {
      setPeers([...peers, mockPeerData(newPeerName)]);
      setNewPeerName('');
      setOpenAddPeer(false);
    }
  };

  const handleDeletePeer = (index: number) => {
    setPeers(peers.filter((_, i) => i !== index));
  };

  const handleDeleteColumn = (columnId: string) => {
    if (columnId !== 'name') {
      setColumns(columns.filter(col => col.id !== columnId));
      setPeers(peers.map(peer => {
        const { [columnId]: removed, ...rest } = peer;
        return {
          name: rest.name || '',
          marketCap: rest.marketCap || '',
          adv: rest.adv || '',
          epsFY1: rest.epsFY1 || '',
          epsFY2: rest.epsFY2 || '',
          peFY1: rest.peFY1 || '',
          peFY2: rest.peFY2 || '',
          ...rest
        };
      }));
    }
  };

  const formatValue = (value: string, type: string): string => {
    if (!value) return '-';
    
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'number':
        return value;
      default:
        return value;
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111' }}>
            Peer Comparison
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setOpenAddColumn(true)}
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600, color: '#0071e3', border: '1px solid #0071e3' }}
            >
              Add Column
            </Button>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setOpenAddPeer(true)}
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600, color: '#1db954', border: '1px solid #1db954' }}
            >
              Add Peer
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600, bgcolor: '#3949ab', color: '#fff', ml: 1 }}
              onClick={() => setDefaultColumns(columns.map(col => col.id))}
            >
              Save as Default
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 340, boxShadow: 'none', borderRadius: 2 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      minWidth: column.id === 'name' ? 150 : 120,
                      position: 'relative',
                      background: '#f5f5f7',
                      color: '#111'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {column.label}
                      {column.id !== 'name' && (
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteColumn(column.id)}
                          sx={{ ml: 0.5, p: 0.5 }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ minWidth: 80, background: '#f5f5f7', color: '#111' }}>Delete?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {peers.map((peer, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      <Typography
                        sx={{
                          fontWeight: column.id === 'name' ? 'bold' : 'normal',
                          color: peer[column.id] ? 'inherit' : 'text.secondary',
                          fontSize: 14
                        }}
                      >
                        {column.id === 'name'
                          ? `${peer[column.id]}${peerTickers[peer[column.id]] ? ` (${peerTickers[peer[column.id]]})` : ''}`
                          : formatValue(peer[column.id], column.type)}
                      </Typography>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePeer(index)}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add Column Dialog */}
        <Dialog open={openAddColumn} onClose={() => setOpenAddColumn(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Column ID"
                value={newColumn.id}
                onChange={(e) => setNewColumn({ ...newColumn, id: e.target.value })}
                placeholder="e.g., revenue, margin"
              />
              <TextField
                label="Column Label"
                value={newColumn.label}
                onChange={(e) => setNewColumn({ ...newColumn, label: e.target.value })}
                placeholder="e.g., Revenue, Operating Margin"
              />
              <FormControl>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={newColumn.type}
                  label="Data Type"
                  onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value as any })}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddColumn(false)}>Cancel</Button>
            <Button onClick={handleAddColumn} variant="contained">Add Column</Button>
          </DialogActions>
        </Dialog>
        {/* Add Peer Dialog */}
        <Dialog open={openAddPeer} onClose={() => setOpenAddPeer(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Add New Peer</DialogTitle>
          <DialogContent>
            <TextField
              label="Peer Name"
              value={newPeerName}
              onChange={(e) => setNewPeerName(e.target.value)}
              fullWidth
              autoFocus
              placeholder="e.g., Amazon.com Inc."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddPeer(false)}>Cancel</Button>
            <Button onClick={handleAddPeer} variant="contained">Add Peer</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PeerComparison; 
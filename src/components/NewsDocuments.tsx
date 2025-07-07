import React, { useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Tooltip, IconButton, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const mockData: { [key: string]: { title: string; date: string; link: string }[] } = {
  '10-K': [
    { title: 'Apple Inc. 2023 10-K', date: '2023-10-27', link: '#' },
    { title: 'Apple Inc. 2022 10-K', date: '2022-10-28', link: '#' },
  ],
  'Press Releases': [
    { title: 'Apple Reports Second Quarter Results', date: '2024-05-02', link: '#' },
    { title: 'Apple Unveils New MacBook Pro', date: '2024-04-15', link: '#' },
  ],
  'Transcripts': [
    { title: 'Q2 2024 Earnings Call Transcript', date: '2024-05-02', link: '#' },
    { title: 'Q1 2024 Earnings Call Transcript', date: '2024-02-01', link: '#' },
  ],
  'News': [
    { title: 'Apple Stock Hits New High', date: '2024-05-10', link: '#' },
    { title: 'Apple Expands Services in Europe', date: '2024-05-08', link: '#' },
  ],
};

const mockInsiderSales = [
  { date: '2024-05-01', name: 'Tim Cook', role: 'CEO', shares: 20000, value: '$3,500,000', link: '#' },
  { date: '2024-04-20', name: 'Luca Maestri', role: 'CFO', shares: 10000, value: '$1,750,000', link: '#' },
];

const mockManagementChanges = [
  { date: '2024-03-15', name: 'Jane Doe', role: 'SVP, Retail', change: 'Appointed', note: 'Joined from XYZ Corp.' },
  { date: '2023-12-01', name: 'John Smith', role: 'VP, Operations', change: 'Resigned', note: 'Retired after 20 years.' },
];

const topSections = [
  { label: 'Company Info', icon: <DescriptionIcon />, tooltip: 'SEC filings, press releases, and official company documents.' },
  { label: 'News', icon: <ArticleIcon />, tooltip: 'Latest news headlines about the company.' },
  { label: 'Transcripts', icon: <RecordVoiceOverIcon />, tooltip: 'Earnings call and event transcripts.' },
  { label: 'Insider Sales', icon: <TrendingUpIcon />, tooltip: 'Recent insider sales by company executives.' },
  { label: 'Management Changes', icon: <PeopleAltIcon />, tooltip: 'Recent changes in company management.' },
];

const docTypes = ['10-K', 'Press Releases'] as const;
type DocType = typeof docTypes[number];

const NewsDocuments: React.FC = () => {
  const [section, setSection] = useState(0);
  const [docTab, setDocTab] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // Helper for expand/collapse
  const handleExpand = (idx: number, content: string) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
    setModalContent(content);
  };
  const handleCloseModal = () => setModalContent(null);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff', width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mr: 2 }}>
            News / Documents
          </Typography>
          {topSections.map((s, idx) => (
            <Tooltip key={s.label} title={s.tooltip} arrow>
              <IconButton color={section === idx ? 'primary' : 'default'} onClick={() => setSection(idx)}>
                {s.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
        {/* Section Content */}
        {section === 0 && (
          <Box>
            <Tabs
              value={docTab}
              onChange={(_, v) => setDocTab(v)}
              indicatorColor="primary"
              textColor="primary"
              sx={{ mb: 2 }}
            >
              {docTypes.map((type) => (
                <Tab key={type} label={type} />
              ))}
            </Tabs>
            <List>
              {mockData[docTypes[docTab]].map((item, idx) => (
                <ListItem key={idx} component="a" href={item.link} target="_blank" button sx={{ p: 0, mb: 1 }}>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{item.date}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {section === 1 && (
          <List>
            {mockData['News'].map((item, idx) => (
              <ListItem key={idx} button onClick={() => handleExpand(idx, item.title + ' - ' + item.date)} sx={{ p: 0, mb: 1 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary">{item.date}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        )}
        {section === 2 && (
          <List>
            {mockData['Transcripts'].map((item, idx) => (
              <ListItem key={idx} button onClick={() => handleExpand(idx, item.title + ' - ' + item.date)} sx={{ p: 0, mb: 1 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary">{item.date}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        )}
        {section === 3 && (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Insider Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Shares Sold</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockInsiderSales.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.shares.toLocaleString()}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell><a href={row.link} target="_blank" rel="noopener noreferrer">SEC</a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {section === 4 && (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Change</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockManagementChanges.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.change}</TableCell>
                    <TableCell>{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* Modal for details */}
        <Modal open={!!modalContent} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
            <Typography>{modalContent}</Typography>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default NewsDocuments; 
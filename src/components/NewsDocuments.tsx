import React, { useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, List, ListItem, ListItemText } from '@mui/material';

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

const docTypes = ['10-K', 'Press Releases', 'Transcripts', 'News'] as const;
type DocType = typeof docTypes[number];

const NewsDocuments: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const currentType: DocType = docTypes[selected];
  const items: { title: string; date: string; link: string }[] = mockData[currentType];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e0e0e0', background: '#fff', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          News / Documents
        </Typography>
        <Tabs
          value={selected}
          onChange={(_, v) => setSelected(v)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 2 }}
        >
          {docTypes.map((type) => (
            <Tab key={type} label={type} />
          ))}
        </Tabs>
        <Box>
          <List>
            {items.map((item: { title: string; date: string; link: string }, idx: number) => (
              <ListItem key={idx} component="a" href={item.link} target="_blank" button sx={{ p: 0, mb: 1 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary">{item.date}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsDocuments; 
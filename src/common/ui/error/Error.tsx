import { Box, Button, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import type React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  onRetry: () => void;
}

export function Error({ title, onRetry, children }: Props) {
  return (
    <Box
      sx={{
        width: 400,
        backgroundColor: red['300'],
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '20px',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
        color="textSecondary"
      >
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {children}
      </Typography>
      <Box>
        <Button variant="contained" color="error" onClick={onRetry}>
          Retry
        </Button>
      </Box>
    </Box>
  );
}

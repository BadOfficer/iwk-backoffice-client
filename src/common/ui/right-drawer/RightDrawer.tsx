import { Drawer } from '@mui/material';
import type React from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function RightDrawer({ children, isOpen, onClose }: Props) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      sx={{
        flexShrink: 0,
        overflowY: 'auto',
        [`& .MuiDrawer-paper`]: {
          width: {
            xs: '100%',
            sm: 500,
          },
          boxSizing: 'border-box',
        },
      }}
    >
      {children}
    </Drawer>
  );
}

import { Box, Button, Collapse } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  withHide?: boolean;
  withBackBtn?: boolean;
  children: React.ReactNode;
}

export function MapContent({ withHide = false, children }: Props) {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    setHide((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: '12px',
        top: '50%',
        zIndex: 1000,
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      {withHide && (
        <Button variant="contained" color="secondaryBtn" onClick={toggleHide}>
          {hide ? 'Show' : 'Hide'}
        </Button>
      )}

      <Collapse in={!hide} orientation="horizontal">
        <Box>{children}</Box>
      </Collapse>
    </Box>
  );
}

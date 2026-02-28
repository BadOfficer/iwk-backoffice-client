import { Box, Button, Typography } from '@mui/material';

export function NotFoundPage() {
  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: '500', fontSize: '200px' }}>
          404
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '36px',
          }}
        >
          Page Not Found
        </Typography>
        <Button variant="contained" href="/">
          Go Home
        </Button>
      </Box>
    </Box>
  );
}

import { Typography } from '@mui/material';

export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontSize: '14px',
        fontWeight: 400,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );
}

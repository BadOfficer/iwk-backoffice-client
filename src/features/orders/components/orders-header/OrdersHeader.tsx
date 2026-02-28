import { Box, Button, Typography } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';

interface Props {
  onCreate: () => void;
  onImport: () => void;
  isDisabledActions?: boolean;
}

export function OrdersHeader({
  onCreate,
  onImport,
  isDisabledActions = false,
}: Props) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.title}>
        Orders
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="secondaryBtn"
          startIcon={<DownloadIcon />}
          onClick={onImport}
          disabled={isDisabledActions}
        >
          import
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginLeft: '16px' }}
          onClick={onCreate}
          disabled={isDisabledActions}
        >
          create order
        </Button>
      </Box>
    </Box>
  );
}

import type { Order } from '@/types/Order';
import { useOrder } from '../../hooks/useOrder';
import { RightDrawer } from '@/common/ui/right-drawer';
import { styles } from './style';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { OrderInfo } from '../order-info';
import { OrderJurisdictions } from '../order-jurisdictions';
import { Map } from '@/common/ui/map';

interface Props {
  id: Order['id'];
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsSidebar({ id, isOpen, onClose }: Props) {
  const { orderData, loadingOrderData } = useOrder(id);

  return (
    <RightDrawer isOpen={isOpen} onClose={onClose}>
      {loadingOrderData && (
        <Box sx={styles.loadingWrapper}>
          <CircularProgress />
        </Box>
      )}
      {orderData && !loadingOrderData && (
        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <Typography variant="h2" sx={styles.title}>
              Details
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: '32px' }}>
            <OrderInfo order={orderData} />
          </Box>
          <Box sx={{ marginTop: '32px' }}>
            <OrderJurisdictions order={orderData} />
          </Box>
          <Box
            sx={{
              marginTop: '32px',
              width: '100%',
              height: '300px',
              position: 'relative',
              minHeight: '300px',
            }}
          >
            <Map
              orders={[
                {
                  id: orderData.id,
                  latitude: orderData.latitude,
                  longtitude: orderData.longtitude,
                },
              ]}
              center={[orderData.latitude, orderData.longtitude]}
            />
          </Box>
        </Box>
      )}
    </RightDrawer>
  );
}

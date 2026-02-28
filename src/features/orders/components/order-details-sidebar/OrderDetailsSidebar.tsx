import type { Order } from '@/types/Order';
import { useOrder } from '../../hooks/useOrder';
import { RightDrawer } from '@/common/ui/right-drawer';
import { styles } from './style';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { OrderInfo } from '../order-info';
import { OrderJurisdictions } from '../order-jurisdictions';
import { Map } from '@/common/ui/map';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface Props {
  id: Order['id'];
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsSidebar({ id, isOpen, onClose }: Props) {
  const { orderData, loadingOrderData, orderError, isOrderError } =
    useOrder(id);

  useEffect(() => {
    if (isOrderError && orderError) {
      toast.error(orderError.message);
      onClose();
    }
  }, [orderError, isOrderError]);

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
                  longitude: orderData.longitude,
                },
              ]}
              center={[orderData.latitude, orderData.longitude]}
            />
          </Box>
        </Box>
      )}
    </RightDrawer>
  );
}

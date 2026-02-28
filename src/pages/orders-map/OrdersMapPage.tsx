import { Map } from '@/common/ui/map';

import styles from './OrdersMapPage.module.scss';
import { useOrdersCoords } from '@/features/orders/hooks/useOrdersCoords';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function OrdersMapPage() {
  const {
    coords = [],
    loadingCoords,
    coordsError,
    isCoordsError,
  } = useOrdersCoords();

  useEffect(() => {
    if (coordsError && isCoordsError) {
      toast.error(coordsError.message);
    }
  }, [coordsError, isCoordsError]);

  return (
    <main className={styles.wrapper}>
      {loadingCoords && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Backdrop open={loadingCoords} />
          <CircularProgress />
        </Box>
      )}
      {coords && !loadingCoords && <Map orders={coords} withBackBtn />}
    </main>
  );
}

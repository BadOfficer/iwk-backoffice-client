import { Map } from '@/common/ui/map';

import styles from './OrderCreatePage.module.scss';
import { CreateOrderForm } from '@/features/orders/components/create-order-form/CreateOrderForm';
import { useState } from 'react';
import { PickerMarker } from '@/common/ui/picker-marker';
import type { Coords } from '@/types/Order';

export function OrderCreatePage() {
  const [coords, setCoords] = useState<Coords | null>(null);

  return (
    <main className={styles.wrapper}>
      <Map withBackBtn>
        <PickerMarker markerCoords={coords} onClick={setCoords} />
      </Map>

      <CreateOrderForm coords={coords} onChange={setCoords} />
    </main>
  );
}

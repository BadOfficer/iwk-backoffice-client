import { Map } from '@/common/ui/map';

import styles from './OrderCreatePage.module.scss';
import { CreateOrderForm } from '@/features/orders/components/create-order-form/CreateOrderForm';
import { useEffect, useState } from 'react';
import { PickerMarker } from '@/common/ui/picker-marker';
import type { Coords, CreateOrder } from '@/types/Order';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder';

export function OrderCreatePage() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const {
    createOrderFunc,
    createOrderError,
    createdOrder,
    isCreateOrderError,
    isSuccessCreateOrder,
  } = useCreateOrder();
  const navigate = useNavigate();

  const handleSubmit = (data: CreateOrder) => {
    createOrderFunc(data);
  };

  useEffect(() => {
    if (isSuccessCreateOrder && createdOrder) {
      toast.success(`Order ${createdOrder.id} has been added`);
      navigate('/');
    }
  }, [isSuccessCreateOrder, createdOrder]);

  useEffect(() => {
    if (isCreateOrderError && createOrderError) {
      toast.error(createOrderError.message);
    }
  }, [isCreateOrderError, createOrderError]);

  return (
    <main className={styles.wrapper}>
      <Map withBackBtn>
        <PickerMarker markerCoords={coords} onClick={setCoords} />
      </Map>

      <CreateOrderForm
        coords={coords}
        onChange={setCoords}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/orders';
import { useEffect } from 'react';

export function OrdersPage() {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Orders Page</div>;
}

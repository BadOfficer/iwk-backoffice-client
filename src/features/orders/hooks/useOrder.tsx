import type { Order } from '@/types/Order';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../api/orders';

export function useOrder(id: Order['id']) {
  const {
    data: orderData,
    isLoading: loadingOrderData,
    error,
  } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrderById(id),
  });

  return { orderData, loadingOrderData, error };
}

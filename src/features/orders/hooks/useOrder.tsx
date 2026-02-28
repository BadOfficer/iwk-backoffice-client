import type { Order } from '@/types/Order';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../api/orders';

export function useOrder(id: Order['id']) {
  const {
    data: orderData,
    isFetching: loadingOrderData,
    error: orderError,
    isError: isOrderError,
  } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrderById(id),
  });

  return { orderData, loadingOrderData, orderError, isOrderError };
}

import { useQuery } from '@tanstack/react-query';
import { getTableOrders } from '../api/orders';
import type { Filters } from '@/types/Filters';

export function useOrders(
  query: string,
  page: number,
  perPage: number,
  filters: Filters,
  flag: boolean = true
) {
  const {
    data: ordersData,
    isLoading: loadingOrders,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['orders', query, page, perPage, filters],
    queryFn: () => getTableOrders(page, perPage, query, filters),
    enabled: flag,
  });

  return { ordersData, loadingOrders, error, isSuccess };
}

import { useQuery } from '@tanstack/react-query';
import { getOrdersCoords } from '../api/orders';

export function useOrdersCoords() {
  const {
    data: coords,
    isFetching: loadingCoords,
    error: coordsError,
    isError: isCoordsError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersCoords,
  });

  return {
    coords,
    loadingCoords,
    coordsError,
    isCoordsError,
  };
}

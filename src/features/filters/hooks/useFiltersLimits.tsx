import { useQuery } from '@tanstack/react-query';
import { getFiltersLimits } from '../api/filters';

export function useFiltersLimit() {
  const { data: filtersLimits, isLoading: loadingFiltersLimits } = useQuery({
    queryKey: ['filters'],
    queryFn: getFiltersLimits,
  });

  return { filtersLimits, loadingFiltersLimits };
}

import type { Filters, FiltersLimits } from '@/types/Filters';
import { useEffect, useState } from 'react';

const initialFilters: Filters = {
  date: ['', ''],
  subTotal: [-1, -1],
  taxAmount: [-1, -1],
  taxRate: [-1, -1],
  totalAmount: [-1, -1],
};

export function useFilters(initFilters: FiltersLimits | undefined) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  function changeFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = () => {
    setAppliedFilters(filters);
  };

  const reset = () => {
    setFilters((prev) => ({ ...prev, ...initFilters }));
    setAppliedFilters((prev) => ({ ...prev, ...initFilters }));
  };

  useEffect(() => {
    if (initFilters) {
      setFilters((prev) => ({ ...prev, ...initFilters }));
      setAppliedFilters((prev) => ({ ...prev, ...initFilters }));
    }
  }, [initFilters]);

  const isFiltersExist = !Object.values(filters).flat().includes(-1);

  return {
    filters,
    appliedFilters,
    handleSubmit,
    changeFilter,
    isFiltersExist,
    resetFilters: reset,
  };
}

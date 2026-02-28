import { instance } from '@/api/axios';
import type { FiltersLimits } from '@/types/Filters';

export async function getFiltersLimits(): Promise<FiltersLimits> {
  const { data } = await instance.get<FiltersLimits>('/orders/filterlimits');

  return data;
}

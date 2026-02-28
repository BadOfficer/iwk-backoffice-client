import { instance } from '@/api/axios';
import type { FiltersLimits } from '@/types/Filters';

export async function getFiltersLimits(): Promise<FiltersLimits> {
  // try {

  // } catch (e) {
  //   console.error(e);
  //   throw new Error('Something went wrong');
  // }
  const { data } = await instance.get<FiltersLimits>('/orders/filterlimits');

  return data;
}

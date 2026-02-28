import type { FiltersLimits } from '@/types/Filters';

export async function getFiltersLimits(): Promise<FiltersLimits> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Promise.resolve({
    subTotal: [0, 1000],
    taxAmount: [0, 200],
    taxRate: [0, 0.2],
    totalAmount: [0, 1200],
  });
}

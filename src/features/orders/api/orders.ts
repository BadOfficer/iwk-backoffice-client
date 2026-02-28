import { mockPaginatedOrders } from '@/common/utils/generateMockOrders';
import type { Filters } from '@/types/Filters';
import type { Order, PaginatedOrders } from '@/types/Order';

export async function getTableOrders(
  page: number,
  perPage: number,
  query: string,
  filters: Filters
): Promise<PaginatedOrders> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockPaginatedOrders;
}

export async function getOrderById(id: Order['id']): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Promise.resolve({
    id: 1001,
    timestamp: '2026-02-27T14:32:18Z',
    latitude: 34.052235,
    longtitude: -118.243683,
    subTotal: 85.5,
    taxRate: 0.095,
    stateRate: 0.0625,
    countyRate: 0.01,
    cityRate: 0.015,
    specialRate: 0.0075,
    taxAmount: 8.12,
    totalAmount: 93.62,
    country: 'United States',
    state: 'California',
    county: 'Los Angeles County',
    city: 'Los Angeles',
  });
}

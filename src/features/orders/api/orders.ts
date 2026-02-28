import { instance } from '@/api/axios';
import type { Filters } from '@/types/Filters';
import type {
  CoordsWithIds,
  CreateOrder,
  CreateOrderResponse,
  Order,
  PaginatedOrders,
} from '@/types/Order';

export async function getTableOrders(
  page: number,
  perPage: number,
  query: string,
  filters: Filters
): Promise<PaginatedOrders> {
  const params = {
    page,
    perPage,
    query,
    date: filters.date.join(','),
    subTotal: filters.subTotal.join(','),
    taxAmount: filters.taxAmount.join(','),
    taxRate: filters.taxRate.join(','),
    totalAmount: filters.totalAmount.join(','),
  };

  const { data } = await instance.get<PaginatedOrders>('/orders', {
    params,
  });

  return data;
}

export async function getOrderById(id: Order['id']): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { data } = await instance.get<Order>(`/orders/${id}`);

  return data;
}

export async function getOrdersCoords(): Promise<CoordsWithIds[]> {
  const { data } = await instance.get<CoordsWithIds[]>('/orders/map');

  return data;
}

export async function createOrder(
  createOrderData: CreateOrder
): Promise<CreateOrderResponse> {
  const body: CreateOrder = {
    latitude: createOrderData.latitude,
    longitude: createOrderData.longitude,
    subTotal: createOrderData.subTotal,
  };

  const { data } = await instance.post<CreateOrderResponse>('orders', body);

  return data;
}

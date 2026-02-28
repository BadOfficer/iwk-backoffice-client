import type { PaginatedResponse } from './Response';

export interface Order {
  id: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  subTotal: number;
  totalAmount: number;
  taxRate: number;
  stateRate: number;
  countyRate: number;
  cityRate: number;
  specialRate: number;
  taxAmount: number;
  country: string;
  state: string;
  county: string;
  city: string;
  special: string;
}

export type TableOrder = Pick<
  Order,
  | 'id'
  | 'timestamp'
  | 'latitude'
  | 'longitude'
  | 'subTotal'
  | 'taxRate'
  | 'taxAmount'
  | 'totalAmount'
>;

export interface PaginatedOrders extends PaginatedResponse<TableOrder[]> {}

export type CreateOrder = Pick<Order, 'latitude' | 'longitude' | 'subTotal'>;

export interface CreateOrderResponse {
  id: Order['id'];
}

export interface OrdersImportResponse {
  saved: number;
  rejected: number;
  processed: number;
}

export type Coords = Pick<Order, 'latitude' | 'longitude'>;
export type CoordsWithIds = Coords & Pick<Order, 'id'>;

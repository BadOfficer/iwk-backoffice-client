import type { PaginatedResponse } from './Response';

export interface Order {
  id: number;
  timestamp: string;
  latitude: number;
  longtitude: number;
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
}

export type TableOrder = Pick<
  Order,
  | 'id'
  | 'timestamp'
  | 'latitude'
  | 'longtitude'
  | 'subTotal'
  | 'taxRate'
  | 'taxAmount'
  | 'totalAmount'
>;

export interface PaginatedOrders extends PaginatedResponse<TableOrder[]> {}

export type CreateOrder = Pick<Order, 'latitude' | 'longtitude' | 'subTotal'>;

export type Coords = Pick<Order, 'latitude' | 'longtitude'>;

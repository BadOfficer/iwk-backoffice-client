export interface Filters {
  date: [string, string];
  subTotal: [number, number];
  taxAmount: [number, number];
  taxRate: [number, number];
  totalAmount: [number, number];
}

export type FiltersLimits = Omit<Filters, 'date'>;

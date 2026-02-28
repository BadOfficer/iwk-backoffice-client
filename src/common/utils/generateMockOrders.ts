import type { PaginatedOrders, TableOrder } from '@/types/Order';

export const generateMockOrders = (count: number): TableOrder[] => {
  return Array.from({ length: count }, (_, index) => {
    const id = 1000 + index;
    const subTotal = parseFloat((Math.random() * 500 + 10).toFixed(2));
    const taxRate = 0.05;
    const taxAmount = parseFloat((subTotal * taxRate).toFixed(2));
    const totalAmount = parseFloat((subTotal + taxAmount).toFixed(2));

    return {
      id,
      timestamp: new Date(2024, 0, 1 + (index % 30)).toISOString(),
      latitude: parseFloat((40 + Math.random() * 10).toFixed(6)),
      longtitude: parseFloat((-100 + Math.random() * 20).toFixed(6)),
      subTotal,
      taxRate,
      taxAmount,
      totalAmount,
    };
  });
};

export const mockPaginatedOrders: PaginatedOrders = {
  totalElements: 100,
  data: generateMockOrders(10),
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../api/orders';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createOrderFunc,
    error: createOrderError,
    data: createdOrder,
    isError: isCreateOrderError,
    isSuccess: isSuccessCreateOrder,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('Order created with ID:', data.id);

      queryClient.invalidateQueries({ queryKey: ['orders', 'filters'] });
    },
  });

  return {
    createOrderFunc,
    createOrderError,
    createdOrder,
    isCreateOrderError,
    isSuccessCreateOrder,
  };
}

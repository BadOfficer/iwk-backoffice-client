import { Details } from '@/common/ui/details/Details';
import { formatDateWithoutTime, formatTime } from '@/common/utils/fomatDate';
import { formatCurrency } from '@/common/utils/formatCurrency';
import type { Order } from '@/types/Order';

interface Props {
  order: Order;
}

export function OrderInfo({ order }: Props) {
  return (
    <Details>
      <Details.Title>Order information</Details.Title>
      <Details.Row title="ID" value={order.id} />
      <Details.Group>
        <Details.Row
          title="Date"
          value={formatDateWithoutTime(new Date(order.timestamp))}
        />
        <Details.Row
          title="Time"
          value={formatTime(new Date(order.timestamp))}
        />
      </Details.Group>
      <Details.Row title="Longtitude" value={order.longtitude} />
      <Details.Row title="Latitude" value={order.latitude} />
      <Details.Row title="Subtotal" value={formatCurrency(order.subTotal)} />
      <Details.Row
        title="Total amount"
        value={formatCurrency(order.totalAmount)}
      />
    </Details>
  );
}

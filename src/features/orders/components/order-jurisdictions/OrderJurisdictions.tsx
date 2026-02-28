import { Details } from '@/common/ui/details/Details';
import { formatCurrency } from '@/common/utils/formatCurrency';
import type { Order } from '@/types/Order';

interface Props {
  order: Order;
}

export function OrderJurisdictions({ order }: Props) {
  return (
    <Details>
      <Details.Title>Tax Rate backdown</Details.Title>
      <Details.Accordion
        headerTitle="Tax Rate"
        headerValue={`${order.taxRate}%`}
      >
        <>
          <Details.Row title="State Rate" value={`${order.stateRate}%`} />
          <Details.Row title="County Rate" value={`${order.countyRate}%`} />
          <Details.Row title="City Rate" value={`${order.cityRate}%`} />
          <Details.Row title="Special Rate" value={`${order.specialRate}%`} />
        </>
      </Details.Accordion>
      <Details.Row title="Tax Amount" value={formatCurrency(order.taxAmount)} />
      <Details.Accordion headerTitle="Jurisdictions">
        <>
          <Details.Row title="Country" value={order.country} />
          <Details.Row title="State" value={order.state} />
          {order.county && <Details.Row title="County" value={order.county} />}
          {order.city && <Details.Row title="City" value={order.city} />}
          {order.special && (
            <Details.Row title="Special" value={order.special} />
          )}
        </>
      </Details.Accordion>
    </Details>
  );
}

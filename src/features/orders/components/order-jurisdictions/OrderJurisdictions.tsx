import { Details } from '@/common/ui/details/Details';
import { formatCurrency } from '@/common/utils/formatCurrency';
import { preparePercentageValue } from '@/common/utils/preparePercentageValue';
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
        headerValue={preparePercentageValue(order.taxRate)}
      >
        <>
          <Details.Row
            title="State Rate"
            value={preparePercentageValue(order.stateRate)}
          />
          <Details.Row
            title="County Rate"
            value={preparePercentageValue(order.countyRate)}
          />
          <Details.Row
            title="City Rate"
            value={preparePercentageValue(order.cityRate)}
          />
          <Details.Row
            title="Special Rate"
            value={preparePercentageValue(order.specialRate)}
          />
        </>
      </Details.Accordion>
      <Details.Row title="Tax Amount" value={formatCurrency(order.taxAmount)} />
      <Details.Accordion headerTitle="Jurisdictions">
        <>
          <Details.Row title="Country" value={order.country} />
          <Details.Row title="State" value={order.state} />
          <Details.Row title="County" value={order.county} />
          <Details.Row title="City" value={order.city} />
        </>
      </Details.Accordion>
    </Details>
  );
}

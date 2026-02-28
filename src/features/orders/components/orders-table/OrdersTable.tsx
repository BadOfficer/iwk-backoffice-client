import { formatDate } from '@/common/utils/fomatDate';
import { formatCurrency } from '@/common/utils/formatCurrency';
import type { Order, TableOrder } from '@/types/Order';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { memo } from 'react';

interface Props {
  orders: TableOrder[];
  onOrderDeatilsClick: (id: Order['id']) => void;
}

function CenteredTableCell({ children }: { children: React.ReactNode }) {
  return (
    <TableCell
      sx={{
        textAlign: 'center',
      }}
    >
      {children}
    </TableCell>
  );
}

export const OrdersTable = memo(function OrdersTable({
  orders,
  onOrderDeatilsClick,
}: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell sx={{ minWidth: '190px' }}>Date & Time</TableCell>
            <TableCell sx={{ minWidth: '220px' }}>Coords</TableCell>
            <CenteredTableCell>Subtotal</CenteredTableCell>
            <CenteredTableCell>Tax Rate</CenteredTableCell>
            <CenteredTableCell>Tax Amount</CenteredTableCell>
            <CenteredTableCell>Total Amount</CenteredTableCell>
            <CenteredTableCell>Actions</CenteredTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No orders found
              </TableCell>
            </TableRow>
          )}
          {orders.length > 0 &&
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{formatDate(new Date(order.timestamp))}</TableCell>
                <TableCell>
                  <Typography>Longitude: {order.longitude}</Typography>
                  <Typography>Latitude: {order.latitude}</Typography>
                </TableCell>

                <CenteredTableCell>
                  {formatCurrency(order.subTotal)}
                </CenteredTableCell>

                <CenteredTableCell>{order.taxRate}%</CenteredTableCell>
                <CenteredTableCell>
                  {formatCurrency(order.taxAmount)}
                </CenteredTableCell>
                <CenteredTableCell>
                  {formatCurrency(order.totalAmount)}
                </CenteredTableCell>
                <CenteredTableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onOrderDeatilsClick(order.id)}
                  >
                    Details
                  </Button>
                </CenteredTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

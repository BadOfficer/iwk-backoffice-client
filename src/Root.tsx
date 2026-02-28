import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import App from './App';
import { ROUTES } from './constants/routes';
import { OrdersPage } from './pages/orders';
import { OrderCreatePage } from './pages/order-create';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrdersMapPage } from './pages/orders-map';
import { NotFoundPage } from './pages/not-found';

const queryClient = new QueryClient();

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<App />}>
            <Route index element={<Navigate to={ROUTES.ORDERS} />} />

            <Route path={ROUTES.ORDERS} element={<OrdersPage />} />

            <Route path={ROUTES.ORDER_CREATE} element={<OrderCreatePage />} />

            <Route path={ROUTES.ORDERS_MAP} element={<OrdersMapPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

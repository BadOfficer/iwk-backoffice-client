import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import App from './App';
import { ROUTES } from './constants/routes';
import { OrdersPage } from './pages/orders';
import { OrderCreatePage } from './pages/order-create';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './features/auth/context/AuthContext';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrdersMapPage } from './pages/OrdersMapPage';

const queryClient = new QueryClient();

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={ROUTES.ORDERS} />} />

              <Route path={ROUTES.ORDERS} element={<OrdersPage />} />

              <Route path={ROUTES.ORDER_CREATE} element={<OrderCreatePage />} />

              <Route path={ROUTES.ORDERS_MAP} element={<OrdersMapPage />} />
            </Route>

            <Route path={ROUTES.AUTH} element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

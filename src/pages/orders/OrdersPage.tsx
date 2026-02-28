import { useState } from 'react';

import styles from './OrderPage.module.scss';

import { Box, Card, CircularProgress, Container } from '@mui/material';
import { OrdersPagination } from '@/features/orders/components/orders-pagination';
import { OrdersTable } from '@/features/orders/components/orders-table';
import { OrdersToolbar } from '@/features/orders/components/orders-toolbar';
import { OrdersHeader } from '@/features/orders/components/orders-header';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { OrdersUploadModal } from '@/features/orders/components/orders-upload-modal';
import { useOrdersPagination } from '@/features/orders/hooks/useOrdersPagination';
import type { TableOrder } from '@/types/Order';
import { useFiltersLimit } from '@/features/filters/hooks/useFiltersLimits';
import { useFilters } from '@/features/filters/hooks/useFilters';
import { FiltersModal } from '@/features/filters/components/filters-modal';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderDetailsSidebar } from '@/features/orders/components/order-details-sidebar';
import { Error } from '@/common/ui/error';

export function OrdersPage() {
  const navigate = useNavigate();

  const {
    filtersLimits,
    loadingFiltersLimits,
    filtersLimitsError,
    refetcFilterLimits,
    isFiltersLimitsError,
  } = useFiltersLimit();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<TableOrder['id'] | null>(
    null
  );

  const {
    filters,
    changeFilter,
    appliedFilters,
    handleSubmit: onSubmitFilters,
    isFiltersExist,
    resetFilters,
  } = useFilters(filtersLimits);

  const {
    page,
    changePage,
    rowsPerPage,
    changePerPage,
    query,
    changeQuery,
    reset,
    resetPage,
  } = useOrdersPagination();

  const {
    ordersData = {
      data: [],
      totalElements: 0,
    },
    loadingOrders,
    ordersError,
    refetchOrders,
    isOrdersError,
  } = useOrders(query, page, rowsPerPage, appliedFilters, isFiltersExist);

  const handleSubmitFilters = () => {
    reset();
    onSubmitFilters();
  };

  const handleResetFilters = () => {
    reset();
    resetFilters();
  };

  const isLoading = loadingFiltersLimits || loadingOrders;
  const isDisabled =
    loadingFiltersLimits || loadingOrders || ordersData?.data.length === 0;
  const isQueryDisabled =
    loadingFiltersLimits || (ordersData.totalElements === 0 && !loadingOrders);

  const isError = isFiltersLimitsError || isOrdersError;
  const error = filtersLimitsError || ordersError;

  if (isError && error) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Error
          title="Error"
          onRetry={() => {
            if (filtersLimitsError) {
              return refetcFilterLimits();
            }

            refetchOrders();
          }}
        >
          {error.message}
        </Error>
      </Box>
    );
  }

  return (
    <>
      <OrdersUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccessUpload={() => {
          reset();
          resetFilters();
        }}
      />
      {filtersLimits && (
        <FiltersModal
          filtersLimits={filtersLimits}
          filters={filters}
          isOpen={showFiltersModal}
          onChangeFilter={changeFilter}
          onClose={() => setShowFiltersModal(false)}
          onSubmit={handleSubmitFilters}
          onReset={handleResetFilters}
        />
      )}
      {activeOrderId && (
        <OrderDetailsSidebar
          isOpen={Boolean(activeOrderId)}
          onClose={() => setActiveOrderId(null)}
          id={activeOrderId}
        />
      )}

      <main className={styles.wrapper}>
        <Container>
          <OrdersHeader
            onCreate={() => navigate(ROUTES.ORDER_CREATE)}
            onImport={() => setShowUploadModal(true)}
            isDisabledActions={isLoading}
          />

          <Box className={styles.tableWrapper}>
            <OrdersToolbar
              onFilter={() => setShowFiltersModal(true)}
              onChangeQuery={(val: string) => {
                resetPage();
                changeQuery(val);
              }}
              isQueryDisabled={isQueryDisabled}
              isFiltersDisabled={isDisabled || !isFiltersExist}
            />
            <Card sx={{ marginTop: '16px' }}>
              {isLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBlock: '32px',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {ordersData && !isLoading && (
                <OrdersTable
                  orders={ordersData.data}
                  onOrderDeatilsClick={setActiveOrderId}
                />
              )}
              <OrdersPagination
                changePage={changePage}
                changePerPage={changePerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                totalElements={ordersData.totalElements}
                isDisabled={isDisabled}
              />
            </Card>
          </Box>
        </Container>
      </main>
    </>
  );
}

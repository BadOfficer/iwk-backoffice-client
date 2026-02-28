import { TablePagination } from '@mui/material';
import { PER_PAGE_OPTIONS } from '../../constants';

interface Props {
  totalElements: number;
  isDisabled?: boolean;
  page: number;
  rowsPerPage: number;
  changePage: (page: number) => void;
  changePerPage: (perPage: string) => void;
}

export function OrdersPagination({
  totalElements,
  isDisabled = false,
  changePage,
  changePerPage,
  page,
  rowsPerPage,
}: Props) {
  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={page}
      onPageChange={(_, newPage) => changePage(newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(e) => changePerPage(e.target.value)}
      rowsPerPageOptions={PER_PAGE_OPTIONS}
      disabled={isDisabled}
      showFirstButton
      showLastButton
    />
  );
}

import { getSearchWith } from '@/common/utils/getSearchWith';
import { useSearchParams } from 'react-router';

export function useOrdersPagination(
  defaultPage = 0,
  defaultPerPage = 10,
  defaultQuery = ''
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (option: Record<string, string | null>) => {
    setSearchParams(getSearchWith(option, searchParams));
  };

  const changePage = (page: number) => {
    handleSearchParams({ page: page === 0 ? null : page.toString() });
  };

  const changePerPage = (perPage: string) => {
    handleSearchParams({ perPage, page: null });
  };

  const changeQuery = (value: string) => {
    if (value === '') {
      handleSearchParams({ query: null });
      return;
    }

    handleSearchParams({ query: value });
  };

  const reset = () => {
    handleSearchParams({ page: null, query: null });
  };

  const resetPage = () => {
    handleSearchParams({ page: null });
  };

  const page = searchParams.get('page') || defaultPage;
  const rowsPerPage = searchParams.get('perPage') || defaultPerPage;
  const query = searchParams.get('query') || defaultQuery;

  return {
    changePage,
    changePerPage,
    page: +page,
    rowsPerPage: +rowsPerPage,
    query,
    reset,
    changeQuery,
    resetPage,
  };
}

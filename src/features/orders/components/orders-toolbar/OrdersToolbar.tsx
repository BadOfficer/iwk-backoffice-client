import { Button, Card, TextField } from '@mui/material';

import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/common/hooks/useDebounce';

interface Props {
  onFilter: () => void;
  onChangeQuery: (value: string) => void;
  isQueryDisabled?: boolean;
  isFiltersDisabled?: boolean;
}

export function OrdersToolbar({
  onFilter,
  onChangeQuery,
  isQueryDisabled = false,
  isFiltersDisabled = false,
}: Props) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    onChangeQuery(debouncedValue);
  }, [debouncedValue]);

  return (
    <Card
      sx={{
        padding: '26px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <TextField
        id="query"
        label="Query"
        variant="outlined"
        size="small"
        sx={{ width: '100%' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isQueryDisabled}
      />
      <Button
        variant="contained"
        color="secondaryBtn"
        startIcon={<FilterListAltIcon />}
        onClick={onFilter}
        disabled={isFiltersDisabled}
      >
        filters
      </Button>
    </Card>
  );
}

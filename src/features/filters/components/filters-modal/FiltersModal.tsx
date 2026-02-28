import { RightDrawer } from '@/common/ui/right-drawer';
import type { Filters, FiltersLimits } from '@/types/Filters';
import {
  Box,
  Button,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { styles } from './styles';
import { RangeSlider } from '@/common/ui/range-slider';
import { Subtitle } from '@/common/ui/subtitle';
import type React from 'react';

interface Props {
  filtersLimits: FiltersLimits;
  filters: Filters;
  onChangeFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  isOpen: boolean;
  onClose: () => void;

  onSubmit?: () => void;
  onReset?: () => void;
}

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

export function FiltersModal({
  filtersLimits,
  filters,
  onChangeFilter,
  isOpen,
  onClose,
  onSubmit = () => {},
  onReset = () => {},
}: Props) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit();
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <RightDrawer isOpen={isOpen} onClose={onClose}>
      <Box sx={styles.content}>
        <Box sx={styles.header}>
          <Typography variant="h2" sx={styles.title}>
            Filters
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.formContainer}>
          <StyledForm onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <Subtitle>Date</Subtitle>
              </legend>

              <Box sx={{ ...styles.formRow, ...styles.dateRow }}>
                <TextField
                  id="from-date"
                  name="from-date"
                  type="date"
                  label="From date"
                  value={filters.date[0]}
                  onChange={(e) =>
                    onChangeFilter('date', [e.target.value, filters.date[1]])
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                      min: filters.date[0],
                      sx: {
                        '&:invalid::-webkit-datetime-edit': {
                          color: 'transparent',
                        },
                      },
                    },
                    input: {
                      placeholder: '',
                    },
                  }}
                  sx={styles.dateInput}
                />
                <Typography variant="body1">—</Typography>
                <TextField
                  id="to-date"
                  name="to-date"
                  type="date"
                  label="To date"
                  value={filters.date[1]}
                  onChange={(e) =>
                    onChangeFilter('date', [filters.date[0], e.target.value])
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                      min: filters.date[0],
                      sx: {
                        '&:invalid::-webkit-datetime-edit': {
                          color: 'transparent',
                        },
                      },
                    },
                    input: {
                      placeholder: '',
                    },
                  }}
                  sx={styles.dateInput}
                />
              </Box>
            </fieldset>

            <fieldset>
              <legend>
                <Subtitle>Subtotal</Subtitle>
              </legend>

              <Box sx={styles.formRow}>
                <RangeSlider
                  id="subTotal"
                  name="subTotal"
                  min={filtersLimits.subTotal[0]}
                  max={filtersLimits.subTotal[1]}
                  onChange={(from, to) =>
                    onChangeFilter('subTotal', [from, to])
                  }
                  initValues={filters.subTotal}
                />
              </Box>
            </fieldset>

            <fieldset>
              <legend>
                <Subtitle>Tax Rate</Subtitle>
              </legend>

              <Box sx={styles.formRow}>
                <RangeSlider
                  id="taxRate"
                  name="taxRate"
                  min={filtersLimits.taxRate[0]}
                  step={0.1}
                  max={filtersLimits.taxRate[1]}
                  onChange={(from, to) => onChangeFilter('taxRate', [from, to])}
                  initValues={filters.taxRate}
                />
              </Box>
            </fieldset>

            <fieldset>
              <legend>
                <Subtitle>Tax Amount</Subtitle>
              </legend>

              <Box sx={styles.formRow}>
                <RangeSlider
                  id="taxAmount"
                  name="taxAmount"
                  min={filtersLimits.taxAmount[0]}
                  max={filtersLimits.taxAmount[1]}
                  onChange={(from, to) =>
                    onChangeFilter('taxAmount', [from, to])
                  }
                  initValues={filters.taxAmount}
                />
              </Box>
            </fieldset>

            <fieldset>
              <legend>
                <Subtitle>Total Amount</Subtitle>
              </legend>

              <Box sx={styles.formRow}>
                <RangeSlider
                  id="totalAmount"
                  name="totalAmount"
                  min={filtersLimits.totalAmount[0]}
                  max={filtersLimits.taxAmount[1]}
                  onChange={(from, to) =>
                    onChangeFilter('totalAmount', [from, to])
                  }
                  initValues={filters.totalAmount}
                />
              </Box>
            </fieldset>
            <Box sx={styles.btns}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" type="reset" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </StyledForm>
        </Box>
      </Box>
    </RightDrawer>
  );
}

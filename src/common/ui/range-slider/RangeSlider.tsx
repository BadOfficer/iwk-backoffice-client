import { useDebounce } from '@/common/hooks/useDebounce';
import { Box, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
  name: string;
  onChange: (startVal: number, endVal: number) => void;
  min: number;
  max: number;
  initValues: number[];
  step?: number;
}

export function RangeSlider({
  max,
  min,
  onChange,
  initValues,
  step = 1,
}: Props) {
  const [value, setValue] = useState(initValues);
  const debouncedValue = useDebounce(value);

  const handleChange = (_: any, val: number[]) => {
    setValue(val);
  };

  useEffect(() => {
    onChange(debouncedValue[0], debouncedValue[1]);
  }, [debouncedValue]);

  useEffect(() => {
    setValue(initValues);
  }, [initValues]);

  return (
    <Box sx={{ width: 'calc(100% - 24px)', marginLeft: '12px' }}>
      <Slider
        step={step}
        value={value}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ cursor: 'pointer' }}>
          {min}
        </Typography>
        <Typography variant="body2" sx={{ cursor: 'pointer' }}>
          {max}
        </Typography>
      </Box>
    </Box>
  );
}

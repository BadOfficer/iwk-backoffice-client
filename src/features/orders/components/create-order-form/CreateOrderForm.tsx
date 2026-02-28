import type { Coords, CreateOrder } from '@/types/Order';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './CreateOrderForm.module.scss';
import * as yup from 'yup';
import { useEffect } from 'react';
import { MapContent } from '@/common/ui/map-content/MapContent';

interface Props {
  coords: Coords | null;
  onChange: (coord: Coords | null) => void;
}

export const createOrderSchema = yup.object({
  latitude: yup
    .number()
    .typeError('Latitude must be a number')
    .required('Latitude is required'),
  longtitude: yup
    .number()
    .typeError('Longtitude must be a number')
    .required('Longtitude is required'),
  subTotal: yup
    .number()
    .typeError('Subtotal must be a number')
    .required('Subtotal is required')
    .min(1, 'Subtotal cannot be negative or 0'),
});

export function CreateOrderForm({ coords, onChange }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(createOrderSchema),
    defaultValues: {
      latitude: coords?.latitude,
      longtitude: coords?.longtitude,
    },
  });

  useEffect(() => {
    if (!coords) return;

    setValue('latitude', coords.latitude);
    setValue('longtitude', coords.longtitude);
  }, [coords, setValue]);

  const watchLat = watch('latitude');
  const watchLng = watch('longtitude');

  useEffect(() => {
    if (
      !watchLat ||
      !watchLng ||
      isNaN(Number(watchLat)) ||
      isNaN(Number(watchLng))
    ) {
      onChange(null);
    } else {
      onChange({
        latitude: Number(watchLat),
        longtitude: Number(watchLng),
      });
    }
  }, [watchLat, watchLng, onChange]);

  const onSubmit = (data: CreateOrder) => {
    console.log('Form data:', data);
  };

  return (
    <>
      <MapContent withHide>
        <Box
          className={styles.form}
          sx={{
            backgroundColor: '#ffffff',
            padding: '24px',
            width: {
              xs: '100%',
              md: '400px',
            },
            borderRadius: '8px',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <fieldset className={styles.inputsGroup}>
                <legend className={styles.inputsGroupTitle}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '24px',
                      fontWeight: '400',
                    }}
                  >
                    Coords
                  </Typography>
                </legend>
                <TextField
                  label="Latitude"
                  error={!!errors.latitude}
                  helperText={errors.latitude?.message}
                  {...register('latitude')}
                  onChange={(e) => {
                    register('latitude').onChange(e);
                    if (!e.target.value) onChange(null);
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />

                <TextField
                  label="Longtitude"
                  error={!!errors.longtitude}
                  helperText={errors.longtitude?.message}
                  {...register('longtitude')}
                  onChange={(e) => {
                    register('longtitude').onChange(e);
                    if (!e.target.value) onChange(null);
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </fieldset>

              <fieldset className={styles.inputsGroup}>
                <legend className={styles.inputsGroupTitle}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '24px',
                      fontWeight: '400',
                    }}
                  >
                    Subtotal
                  </Typography>
                </legend>
                <TextField
                  label="Subtotal"
                  error={!!errors.subTotal}
                  helperText={errors.subTotal?.message}
                  {...register('subTotal', { valueAsNumber: true })}
                />
              </fieldset>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                marginTop: '40px',
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={() => reset()}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </MapContent>
    </>
  );
}

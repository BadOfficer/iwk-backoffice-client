import type { CoordsWithIds } from '@/types/Order';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import type { ReactNode } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createCustomClusterIcon } from './createCustomClusterIcon';

import './cluster-icon.css';

interface Props {
  center?: [number, number];
  orders?: CoordsWithIds[];
  onClick?: ({ lat, lng }: { lat: number; lng: number }) => void;
  children?: ReactNode;
  withBackBtn?: boolean;
}

export function Map({
  center = [40.7128, -74.006],
  orders = [],
  withBackBtn = false,
  children,
}: Props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('..');
  };

  return (
    <>
      {withBackBtn && (
        <Button
          onClick={handleBack}
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            position: 'fixed',
            left: {
              xs: '64px',
              md: '128px',
            },
            top: {
              xs: '76px',
              md: '12px',
            },
            zIndex: 1000,
          }}
        >
          Back
        </Button>
      )}
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          iconCreateFunction={createCustomClusterIcon}
        >
          {orders.map(({ id, latitude, longitude: longitude }) => (
            <Marker position={[latitude, longitude]} key={id} />
          ))}
        </MarkerClusterGroup>

        {children}
      </MapContainer>
    </>
  );
}

import type { CoordsWithIds } from '@/types/Order';
import { CircleMarker, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useMemo, type ReactNode } from 'react';
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
  markerType?: 'circle' | 'default';
}

export function Map({
  center = [40.7128, -74.006],
  orders = [],
  withBackBtn = false,
  children,
  markerType = 'default',
}: Props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('..');
  };

  const markers = useMemo(() => {
    return markerType === 'default'
      ? orders.map((orderItem) => (
          <Marker
            position={[orderItem.latitude, orderItem.longitude]}
            key={orderItem.id}
          />
        ))
      : orders.map((orderItem) => (
          <CircleMarker
            key={orderItem.id}
            center={[orderItem.latitude, orderItem.longitude]}
            radius={4}
          />
        ));
  }, [orders]);

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
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={80}
          removeOutsideVisibleBounds={true}
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers}
        </MarkerClusterGroup>

        {children}
      </MapContainer>
    </>
  );
}

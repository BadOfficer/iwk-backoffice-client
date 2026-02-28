import type { Coords } from '@/types/Order';
import { Marker, useMapEvents } from 'react-leaflet';

interface Props {
  onClick: ({ latitude, longtitude }: Coords) => void;
  markerCoords: Coords | null;
}

export function PickerMarker({ onClick, markerCoords }: Props) {
  useMapEvents({
    click: (e) => {
      onClick({ latitude: e.latlng.lat, longtitude: e.latlng.lng });
    },
  });

  return markerCoords ? (
    <Marker
      position={{ lat: markerCoords.latitude, lng: markerCoords.longtitude }}
    />
  ) : null;
}

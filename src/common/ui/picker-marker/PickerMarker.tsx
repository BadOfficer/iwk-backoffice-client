import type { Coords } from '@/types/Order';
import { Marker, useMapEvents } from 'react-leaflet';

interface Props {
  onClick: ({ latitude, longitude }: Coords) => void;
  markerCoords: Coords | null;
}

export function PickerMarker({ onClick, markerCoords }: Props) {
  useMapEvents({
    click: (e) => {
      onClick({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });

  return markerCoords ? (
    <Marker
      position={{ lat: markerCoords.latitude, lng: markerCoords.longitude }}
    />
  ) : null;
}

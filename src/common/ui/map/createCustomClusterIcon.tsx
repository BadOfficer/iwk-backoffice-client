import L from 'leaflet';

export const createCustomClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  let size = 'small';

  if (count >= 50) {
    size = 'large';
  } else if (count >= 10) {
    size = 'medium';
  }

  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `custom-marker-cluster custom-marker-cluster-${size}`,
    iconSize: L.point(40, 40),
  });
};

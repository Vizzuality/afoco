import { LayerProps } from 'react-map-gl';

export function useLayer(): LayerProps {
  return {
    id: 'points_of_interest',
    source: 'afoco_offices',
    'source-layer': 'afoco_offices',
    type: 'circle',
    // paint: {
    //   'circle-stroke-color': '#ffffff',
    //   'circle-stroke-width': 3,
    //   'circle-radius': 10,
    //   'circle-color': 'red',
    // },
  };
}

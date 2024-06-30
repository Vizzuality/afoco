import type { LayerProps } from 'react-map-gl';

import { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  return [
    {
      id: 'land_degradation_fill',
      type: 'fill',
      source: 'land_degradation',
      'source-layer': 'land_degradation',
      paint: {
        'fill-color': [
          'match',
          ['get', 'Classes_de'],
          'Low degradation (T1)',
          '#FFCC73',
          'No degradation (TN)',
          '#D1D5DB',
          'Medium degradation (T2)',
          '#D48D00',
          'High degradation (T3)',
          '#E23600',
          /* other */ '#ccc',
        ],
        'fill-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
    },
  ];
}

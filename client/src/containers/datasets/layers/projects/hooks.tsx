import { CircleLayer } from 'mapbox-gl';

import { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}) {
  return [
    {
      id: 'projects_points_shadow',
      type: 'circle',
      paint: {
        'circle-radius': 32,
        'circle-color': '#ccc',
        'circle-blur': 1,
        'circle-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
    },
    {
      id: 'projects',
      type: 'circle',
      paint: {
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 3, 7],
        'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 13, 7],
        'circle-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#EFB82A',
          '#176252',
        ],
        'circle-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
    },
  ] as CircleLayer[];
}

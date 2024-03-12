import type { LayerProps } from 'react-map-gl';

import { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}) {
  return [
    {
      id: 'projects_boundaries',
      type: 'line',
      paint: {
        'line-color': '#176252',
        'line-opacity': opacity,
        'line-width': 2,
      },
      layout: {
        visibility: visibility,
      },
    },
    {
      id: 'projects_fill',
      type: 'fill',
      paint: {
        'fill-color': '#176252',
        'fill-opacity': opacity * 0.4,
      },
      layout: {
        visibility: visibility,
      },
    },
  ] as LayerProps[];
}

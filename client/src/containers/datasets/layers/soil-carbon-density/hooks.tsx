import type { LayerProps } from 'react-map-gl';

import { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  return [
    {
      id: 'soil-carbon-density_fill',
      type: 'raster',
      paint: {
        'raster-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
    },
  ];
}

import type { LayerProps } from 'react-map-gl';

import { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  return [
    {
      id: 'projects_points_shadow',
      type: 'circle',
      source: 'projects',
      filter: ['==', ['get', 'type'], 'centroid'],
      'source-layer': 'afoco_locations_full',
      paint: {
        'circle-radius': 5,
        'circle-color': '#ccc',
        'circle-blur': 1,
        'circle-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 6,
    },
    {
      id: 'projects',
      type: 'circle',
      filter: ['==', ['get', 'type'], 'centroid'],
      source: 'projects',
      'source-layer': 'afoco_locations_full',
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
        'circle-stroke-opacity': opacity,
        'circle-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 6,
    },
    {
      id: 'projects_boundaries',
      type: 'line',
      source: 'projects',
      'source-layer': 'afoco_locations_full',
      paint: {
        'line-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#EFB82A',
          '#176252',
        ],
        'line-opacity': opacity,
        'line-width': 1.5,
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 18,
      minzoom: 6,
    },
    {
      id: 'projects_fill',
      type: 'fill',
      source: 'projects',
      'source-layer': 'afoco_locations_full',
      paint: {
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#EFB82A',
          '#176252',
        ],
        'fill-opacity': opacity * 0.4,
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 18,
      minzoom: 6,
    },
  ];
}

import type { LayerProps } from 'react-map-gl';

import { useAtomValue } from 'jotai';

import { hoveredProjectMapAtom } from '@/store';

import type { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  const hoveredProject = useAtomValue(hoveredProjectMapAtom);
  // The layer is designed to react both to hover events directly on the map and to hover events over a specific project listed in a sidebar.

  // Reactivity to Hover Events on the Map:
  // When a user hovers over the map layer, both point and geometry representations within the layer are programmed to change in color and/or size.

  // Reactivity to Hover Events in the Sidebar:
  // Similarly, When a user hovers over the a project in the sidebar, both point and geometry representations within the layer are programmed to change in color and/or size.
  return [
    {
      id: 'projects_points_shadow',
      type: 'circle',
      source: 'projects',
      'source-layer': 'areas_centroids_c',
      paint: {
        'circle-radius': 16,
        'circle-color': '#ccc',
        'circle-blur': 1,
        'circle-opacity': opacity,
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 8,
    },
    {
      id: 'projects_circle',
      type: 'circle',
      source: 'projects',
      'source-layer': 'areas_centroids_c',
      paint: {
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3,
          ['==', ['get', 'project_code'], hoveredProject],
          7,
          ['!=', ['get', 'project_code'], hoveredProject],
          3,
          7,
        ],
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          13,
          // ['all', ['to-boolean', hoveredProject], ['!=', ['get', 'project_code'], hoveredProject]],
          // 10,
          // ['all', ['to-boolean', hoveredProject], ['==', ['get', 'project_code'], hoveredProject]],
          // 10,
          10,
        ],
        'circle-color': '#176252',
        'circle-stroke-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['all', ['to-boolean', hoveredProject], ['!=', ['get', 'project_code'], hoveredProject]],
          0.2,
          ['all', ['to-boolean', hoveredProject], ['==', ['get', 'project_code'], hoveredProject]],
          1,
          opacity,
        ],
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['all', ['to-boolean', hoveredProject], ['!=', ['get', 'project_code'], hoveredProject]],
          0.2,
          ['all', ['to-boolean', hoveredProject], ['==', ['get', 'project_code'], hoveredProject]],
          1,
          opacity,
        ],
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 8,
    },
    {
      id: 'projects_fill',
      type: 'fill',
      source: 'projects',
      'source-layer': 'areas_centroids_l',
      paint: {
        'fill-color': '#176252',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['all', ['to-boolean', hoveredProject], ['!=', ['get', 'project_code'], hoveredProject]],
          0.2,
          ['all', ['to-boolean', hoveredProject], ['==', ['get', 'project_code'], hoveredProject]],
          1,
          opacity,
        ],
      },
      layout: {
        visibility: visibility,
      },
      minzoom: 8,
    },
  ];
}

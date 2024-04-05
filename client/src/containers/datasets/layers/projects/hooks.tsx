import type { LayerProps } from 'react-map-gl';

import { useAtomValue } from 'jotai';

import { hoveredProjectListAtom } from '@/store';

import type { LayerSettings } from '@/types/layers';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  const hoveredProject = useAtomValue(hoveredProjectListAtom);

  let filterProjectCentroid;
  if (hoveredProject === null) {
    // Apply filter by type == 'centroid' only
    filterProjectCentroid = ['==', ['get', 'type'], 'centroid'];
  } else {
    // Apply filter by both type == 'centroid' and project_code == hoveredProject
    filterProjectCentroid = [
      'all',
      ['==', ['get', 'type'], 'centroid'],
      ['==', ['get', 'project_code'], hoveredProject],
    ];
  }

  // The layer is designed to react both to hover events directly on the map and to hover events over a specific project listed in a sidebar.

  // Reactivity to Hover Events on the Map:
  // When a user hovers over the map layer, both point and geometry representations within the layer are programmed to change in color and/or size.

  // Reactivity to Hover Events in the Sidebar:
  // Similarly, When a user hovers over the a project in the sidebar, both point and geometry representations within the layer are programmed to change in color and/or size.

  // Filtering Mechanism:
  // Alongside the visual changes, hovering over a project in the sidebar also activates a filtering mechanism on the map layer.
  // This filter hides the rest of the projects on the map.
  return [
    {
      id: 'projects_points_shadow',
      type: 'circle',
      source: 'projects',
      filter: filterProjectCentroid,
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
      filter: filterProjectCentroid,
      source: 'projects',
      'source-layer': 'afoco_locations_full',
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
          ['==', ['get', 'project_code'], hoveredProject],
          13,
          7,
        ],
        'circle-color': '#176252',
        'circle-stroke-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['!=', ['get', 'project_code'], hoveredProject],
          0.2,
          ['==', ['get', 'project_code'], hoveredProject],
          1,
          opacity,
        ],
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['!=', ['get', 'project_code'], hoveredProject],
          0.2,
          ['==', ['get', 'project_code'], hoveredProject],
          1,
          opacity,
        ],
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 6,
    },
    {
      id: 'projects_fill',
      type: 'fill',
      source: 'projects',
      'source-layer': 'afoco_locations_full',
      // ...(!!hoveredProject && { filter: ['==', ['get', 'project_code'], hoveredProject] }),
      paint: {
        'fill-color': '#176252',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          ['!=', ['get', 'project_code'], hoveredProject],
          0.2,
          ['==', ['get', 'project_code'], hoveredProject],
          1,
          opacity * 0.4,
        ],
      },
      layout: {
        visibility: visibility,
      },
      maxzoom: 18,
      minzoom: 6,
    },
  ];
}

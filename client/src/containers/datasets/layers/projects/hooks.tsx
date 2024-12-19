import { useMemo, useState } from 'react';

import type { LayerProps } from 'react-map-gl';

import { useParams, usePathname } from 'next/navigation';

import { useAtomValue } from 'jotai';

import { hoveredProjectMapAtom } from '@/store';

import { useGetProjects } from '@/types/generated/project';
import type { LayerSettings } from '@/types/layers';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

export function useLayers({
  settings: { opacity = 1, visibility = 'visible' },
}: {
  settings: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
}): LayerProps[] {
  const hoveredProject = useAtomValue(hoveredProjectMapAtom);
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  // To - Do add search to global state here and in filters component
  const [searchValue] = useState<string | null>(null);
  const [filtersSettings] = useSyncFilters();
  const { data } = useGetProjects(
    {
      populate: '*',
      filters: {
        name: {
          $containsi: searchValue,
        },
        countries: {
          name: {
            $in: filtersSettings?.country,
          },
        },
        intervention_types: {
          name: {
            $containsi: Array.isArray(filtersSettings?.intervention)
              ? filtersSettings?.intervention.map((i: string) => i.replace(/-/g, ' '))
              : [],
          },
        },
        project_indicator_fields: {
          $or: [
            {
              ...(filtersSettings.area_restored?.includes('>500') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_restored?.includes('<200') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_restored?.includes('200-500') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('>500') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('<200') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('200-500') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('>500') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('<200') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('200-500') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
          ],
        },
      },
    },
    {
      query: {
        select: (response) =>
          response?.data?.filter((project) => project.attributes?.project_code !== 'AFoCO_global'),
      },
    }
  );

  const filteredProjects = useMemo(() => {
    return params.id && pathname === 'projects'
      ? [params.id]
      : data?.map((project) => project.attributes?.project_code) || [];
  }, [data, params.id, pathname]);

  // The layer is designed to react both to hover events directly on the map and to hover events over a specific project listed in a sidebar.

  // Reactivity to Hover Events on the Map:
  // When a user hovers over the map layer, both point and geometry representations within the layer are programmed to change in color and/or size.

  // Reactivity to Hover Events in the Sidebar:
  // Similarly, When a user hovers over the a project in the sidebar, both point and geometry representations within the layer are programmed to change in color and/or size.

  return [
    {
      id: 'projects_points_shadow',
      type: 'circle',
      filter: ['in', ['get', 'project_code'], ['literal', filteredProjects]],
      source: 'projects',
      'source-layer': 'areas_centroids_c_v202410',
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
      filter: ['in', ['get', 'project_code'], ['literal', filteredProjects]],
      source: 'projects',
      'source-layer': 'areas_centroids_c_v202410',
      paint: {
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3,
          ['==', ['get', 'project_code'], hoveredProject?.[0]],
          7,
          ['!=', ['get', 'project_code'], hoveredProject?.[0]],
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
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['!=', ['get', 'project_code'], hoveredProject?.[0]],
          ],
          0.2,
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['==', ['get', 'project_code'], hoveredProject?.[0]],
          ],
          1,
          opacity,
        ],
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['!=', ['get', 'project_code'], hoveredProject?.[0]],
          ],
          0.2,
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['==', ['get', 'project_code'], hoveredProject?.[0]],
          ],
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
      filter: ['in', ['get', 'project_code'], ['literal', filteredProjects]],
      source: 'projects',
      'source-layer': 'areas_centroids_l_v202410',
      paint: {
        'fill-color': '#176252',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.7,
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['!=', ['get', 'project_code'], hoveredProject?.[0]],
          ],
          0.2,
          [
            'all',
            ['to-boolean', hoveredProject?.[0]],
            ['==', ['get', 'project_code'], hoveredProject?.[0]],
          ],
          0.7,
          opacity * 0.7,
        ],
      },
      layout: {
        visibility: visibility,
      },
      minzoom: 8,
    },
    {
      id: 'projects_line',
      type: 'line',
      filter: ['in', ['get', 'project_code'], ['literal', filteredProjects]],
      source: 'projects',
      'source-layer': 'areas_centroids_l_v202410',
      paint: {
        'line-color': '#B45F06',
        'line-opacity': opacity,
        'line-width': 1.5,
      },
      layout: {
        visibility: visibility,
      },
      minzoom: 8,
    },
  ];
}

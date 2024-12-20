import { parseAsJson, createSerializer } from 'nuqs/server';

import type { LayerSettings } from '@/types/layers';
import type { MapSettings } from '@/types/map';

import type { FilterSettings } from '@/containers/filters/types';

export type ProjectsTab = 'statistics' | 'list';

export const filtersParser = parseAsJson<FilterSettings>().withDefault({});

export const layersParser = parseAsJson<LayerSettings[]>().withDefault([
  { id: 5, visibility: 'visible', opacity: 1 },
]);

export const basemapSettingsParser = parseAsJson<MapSettings>().withDefault({
  basemap: 'basemap-light',
  labels: 'labels-dark',
  boundaries: true,
  roads: false,
});

export const projectsTabParser = parseAsJson<ProjectsTab>().withDefault('statistics');

export const bboxParser = parseAsJson<[number, number, number, number]>();

// query params parsers
const searchQueryParams = {
  filters: filtersParser,
  layers: layersParser,
  settings: basemapSettingsParser,
  tab: projectsTabParser,
  bbox: bboxParser,
};

export const serialize = createSerializer(searchQueryParams);

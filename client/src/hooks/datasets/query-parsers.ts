import { parseAsJson, createSerializer } from 'nuqs/parsers';

import type { LayerSettings } from '@/types/layers';
import type { MapSettings } from '@/types/map';

import type { FilterSettings } from '@/containers/filters/types';

import { DEFAULT_BBOX } from '@/components/map/constants';

export type ProjectsTab = 'statistics' | 'list';

export const filtersParser = parseAsJson<FilterSettings>().withDefault({});

export const layersParser = parseAsJson<LayerSettings[]>().withDefault([
  { id: 5, visibility: 'visible', opacity: 1 },
]);

export const basemapSettingsParser = parseAsJson<MapSettings>().withDefault({
  basemap: 'basemap-light',
  labels: 'dark',
  boundaries: true,
  roads: false,
});

export const projectsTabParser = parseAsJson<ProjectsTab>().withDefault('statistics');

export const bboxParser = parseAsJson<[number, number, number, number]>().withDefault(DEFAULT_BBOX);

// query params parsers
const searchQueryParams = {
  filters: filtersParser,
  layers: layersParser,
  settings: basemapSettingsParser,
  tab: projectsTabParser,
  bbox: bboxParser,
};

export const serialize = createSerializer(searchQueryParams);

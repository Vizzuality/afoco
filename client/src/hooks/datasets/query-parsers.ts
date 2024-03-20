import { parseAsJson, createSerializer } from 'nuqs/parsers';

import type { LayerSettings } from '@/types/layers';
import type { MapSettings } from '@/types/map';

import type { FilterSettings } from '@/containers/filters/types';

export const filtersParser = parseAsJson<FilterSettings>().withDefault({});

export const layersParser = parseAsJson<LayerSettings[]>().withDefault([]);

export const basemapSettingsParser = parseAsJson<MapSettings>().withDefault({
  basemap: 'basemap-light',
  labels: 'dark',
  boundaries: false,
  roads: false,
});

// query params parsers
const searchQueryParams = {
  filters: filtersParser,
  layers: layersParser,
};

export const serialize = createSerializer(searchQueryParams);

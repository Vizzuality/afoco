import { useQueryState } from 'nuqs';

import { basemapSettingsParser, filtersParser, layersParser } from './query-parsers';

export const useSyncFilters = () => useQueryState('filters', filtersParser);

export const useSyncLayers = () => useQueryState('layers', layersParser);

export const useSyncBasemap = () => useQueryState('basemap-settings', basemapSettingsParser);

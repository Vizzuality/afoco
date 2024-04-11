import { useQueryState } from 'nuqs';

import {
  basemapSettingsParser,
  filtersParser,
  layersParser,
  projectsTabParser,
  bboxParser,
} from './query-parsers';

export const useSyncFilters = () => useQueryState('filters', filtersParser);

export const useSyncLayers = () => useQueryState('layers', layersParser);

export const useSyncBasemap = () => useQueryState('settings', basemapSettingsParser);

export const useSyncProjectsTab = () => useQueryState('tab', projectsTabParser);

export const useSyncBbox = () => useQueryState('bbox', bboxParser);

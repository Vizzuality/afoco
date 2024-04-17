'use client';

import { serialize } from './query-parsers';
import {
  useSyncFilters,
  useSyncLayers,
  useSyncBasemap,
  useSyncProjectsTab,
  useSyncBbox,
} from './sync-query';

// Define a type for the data structure
type QueryParamsData = {
  filters: any;
  layers: any;
  settings: any;
  projectsTab: 'list' | 'statistics';
  bbox: [number, number, number, number];
};

// Define a type for the exclusion parameters
type ExcludeParams = {
  filters?: boolean;
  layers?: boolean;
  settings?: boolean;
  projectsTab?: boolean;
  bbox?: boolean;
};

export const useSyncQueryParams = (
  exclude: ExcludeParams = {},
  defaultValue: Partial<QueryParamsData> = {}
) => {
  const [filtersFromURL] = useSyncFilters();
  const [layersFromURL] = useSyncLayers();
  const [settingsFromURL] = useSyncBasemap();
  const [projectsTabFromURL] = useSyncProjectsTab();
  const [bboxFromURL] = useSyncBbox();

  const filters = defaultValue?.filters || filtersFromURL;
  const layers = defaultValue?.layers || layersFromURL;
  const settings = defaultValue?.settings || settingsFromURL;
  const projectsTab = defaultValue?.projectsTab || projectsTabFromURL;
  const bbox = defaultValue?.bbox || bboxFromURL;

  // Construct the data object with correct typing
  const data: QueryParamsData = { filters, layers, settings, projectsTab, bbox };

  // Filter out excluded keys
  const result: Partial<QueryParamsData> = {};
  Object.keys(data).forEach((key) => {
    if (!(key in exclude && exclude[key as keyof ExcludeParams])) {
      // Use type assertion here to ensure keys are recognized as valid
      result[key as keyof QueryParamsData] = data[key as keyof QueryParamsData];
    }
  });

  // Return the serialized object
  return serialize(result);
};

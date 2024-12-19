'use client';
import { useMemo } from 'react';

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
  exclude: ExcludeParams = {}, // Optional parameter for exclusion
  defaultValue: Partial<QueryParamsData> = {} // Optional default values
) => {
  // Retrieve data from hooks, possibly undefined
  const [filtersFromURL] = useSyncFilters();
  const [layersFromURL] = useSyncLayers();
  const [settingsFromURL] = useSyncBasemap();
  const [projectsTabFromURL] = useSyncProjectsTab();
  const [bboxFromURL] = useSyncBbox();

  // Use useMemo to only recalculate when dependencies change
  const data: QueryParamsData = useMemo(
    () => ({
      // Apply default values if provided, otherwise use values from URL
      filters: defaultValue?.filters ?? filtersFromURL,
      layers: defaultValue?.layers ?? layersFromURL,
      settings: defaultValue?.settings ?? settingsFromURL,
      projectsTab: defaultValue?.projectsTab ?? projectsTabFromURL,
      bbox: defaultValue?.bbox ?? bboxFromURL ?? [0, 0, 0, 0], // Include fallback default for bbox
    }),
    [filtersFromURL, layersFromURL, settingsFromURL, projectsTabFromURL, bboxFromURL, defaultValue]
  );

  // Construct the result by excluding specified keys
  const result: Partial<QueryParamsData> = useMemo(() => {
    const filteredResult: Partial<QueryParamsData> = {};
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof QueryParamsData;
      // Only add key to result if it's not set to be excluded
      if (!exclude[typedKey]) {
        filteredResult[typedKey] = data[typedKey];
      }
    });
    return filteredResult;
  }, [data, exclude]);

  // Serialize the result object to make it suitable for query parameters
  return serialize(result);
};

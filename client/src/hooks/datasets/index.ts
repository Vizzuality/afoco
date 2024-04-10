'use client';

import { serialize } from './query-parsers';
import { useSyncFilters, useSyncLayers, useSyncBasemap } from './sync-query';

// Define a type for the data structure
type QueryParamsData = {
  filters: any;
  layers: any;
  settings: any;
};

// Define a type for the exclusion parameters
type ExcludeParams = {
  filters?: boolean;
  layers?: boolean;
  settings?: boolean;
};

export const useSyncQueryParams = (exclude: ExcludeParams = {}) => {
  const [filters] = useSyncFilters();
  const [layers] = useSyncLayers();
  const [settings] = useSyncBasemap();

  // Construct the data object with correct typing
  const data: QueryParamsData = { filters, layers, settings };

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

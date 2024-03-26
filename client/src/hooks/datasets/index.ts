'use client';

import { serialize } from './query-parsers';
import { useSyncFilters, useSyncLayers, useSyncBasemap } from './sync-query';

export const useSyncQueryParams = () => {
  const [filters] = useSyncFilters();
  const [layers] = useSyncLayers();
  const [settings] = useSyncBasemap();

  return serialize({ filters, layers, settings });
};

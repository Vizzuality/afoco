import { useQueryState, parseAsJson } from 'nuqs';

import type { LayerSettings } from '@/types/layers';
import type { MapSettings } from '@/types/map';

import type { FilterSettings } from '@/containers/filters/types';

export const useSyncFilters = () =>
  useQueryState('filters', parseAsJson<FilterSettings>().withDefault({}));

export const useSyncLayers = () =>
  useQueryState('layers', parseAsJson<LayerSettings[]>().withDefault([]));

export const useSyncBasemap = () =>
  useQueryState(
    'basemap-settings',
    parseAsJson<MapSettings>().withDefault({
      basemap: 'basemap-light',
      labels: 'labels-dark',
      boundaries: false,
      roads: false,
    })
  );

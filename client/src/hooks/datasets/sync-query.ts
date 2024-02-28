import { useQueryState, parseAsJson } from 'nuqs';

import type { LayerSettings } from '@/types/layers';

import type { FilterSettings } from '@/containers/filters/types';

export const useSyncFilters = () =>
  useQueryState('filters', parseAsJson<FilterSettings>().withDefault({}));

export const useSyncLayers = () =>
  useQueryState('layers', parseAsJson<LayerSettings[]>().withDefault([]));

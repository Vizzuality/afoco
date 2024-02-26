import { useQueryState, parseAsJson } from 'nuqs';

import type { FilterSettings } from '@/containers/filters/types';

export const useSyncFilters = () =>
  useQueryState('filters', parseAsJson<FilterSettings>().withDefault({}));

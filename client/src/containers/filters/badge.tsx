'use client';

import { useCallback } from 'react';

import { X } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import type { FiltersType, FilterValues } from '@/containers/filters/types';

import { CATEGORIES_FILTERS_DICTIONARY, INTERVENTION_TYPES } from './constants';

export default function FiltersBadge({
  category,
  filterValue,
}: {
  category: FiltersType;
  filterValue: FilterValues;
}) {
  const [filtersSettings, setFiltersToURL] = useSyncFilters();

  const handleResetFilter = useCallback(
    (category: FiltersType, filterValue: FilterValues) => {
      // Check for both null and undefined
      if (!filtersSettings) return null;

      const filterSettingsCategory: FilterValues | undefined = filtersSettings[category];

      // Check if filterSettingsCategory is not undefined and is an array
      if (Array.isArray(filterSettingsCategory)) {
        const filtersUpdate = {
          ...filtersSettings,
          [category]: filterSettingsCategory.filter((f) => f !== filterValue),
        };

        setFiltersToURL(filtersUpdate);
      } else if (
        typeof filterSettingsCategory === 'string' &&
        filterSettingsCategory === filterValue
      ) {
        // If filterSettingsCategory is a string and matches filterValue, remove it by setting it to an empty array or handling as needed
        const { [category]: _, ...restFiltersSettings } = filtersSettings;
        const filtersUpdate = {
          ...restFiltersSettings,
          // Optionally, handle the removal of a string filter differently here
        };

        setFiltersToURL(filtersUpdate);
      }
    },
    [setFiltersToURL, filtersSettings]
  );

  return (
    <li
      key={`${category}-${filterValue}`}
      className="rounded-2xl border-yellow-500 bg-yellow-50 px-1.5 py-1 text-yellow-800"
      data-cy={`filters-badge-${category}-${filterValue}`}
    >
      <button
        type="button"
        className="pointer-events-auto flex items-center space-x-2 px-1"
        onClick={() => handleResetFilter(category as FiltersType, filterValue as FilterValues)}
        data-cy={`filters-remove-badge-${category}-${filterValue}`}
      >
        <div className="max-w-[328px] space-x-1 truncate text-left text-[11px] xl:text-sm">
          <span>{CATEGORIES_FILTERS_DICTIONARY[category]}</span>
          <span className="font-bold">
            {category === 'intervention'
              ? INTERVENTION_TYPES.find((it) => it.id === filterValue)?.label
              : filterValue}
          </span>
        </div>
        <X className="h-2 w-2 fill-current stroke-yellow-900 text-yellow-900" />
      </button>
    </li>
  );
}

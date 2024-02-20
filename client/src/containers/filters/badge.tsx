'use client';

import { useCallback } from 'react';

import { X } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import type { FiltersType, FilterValues } from '@/containers/filters/types';

import { CATEGORIES_FILTERS_DICTIONARY } from './constants';

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
      className="rounded-2xl border-yellow-500 bg-yellow-50 p-1 text-yellow-800"
    >
      <button
        type="button"
        className="flex items-center space-x-2 px-1"
        onClick={() => handleResetFilter(category as FiltersType, filterValue as FilterValues)}
      >
        <div className="space-x-1">
          <span>{CATEGORIES_FILTERS_DICTIONARY[category]}</span>
          <span className="font-bold">{filterValue}</span>
        </div>
        <X className="h-2 w-2 fill-current stroke-yellow-900 text-yellow-900" />
      </button>
    </li>
  );
}

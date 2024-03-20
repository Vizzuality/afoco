'use client';

import flatten from 'lodash-es/flatten';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import type { FiltersType, FilterSettings } from '@/containers/filters/types';

import FiltersBadge from './badge';
import { INTERVENTION_TYPES, AREAS } from './constants';

export default function FiltersSelected() {
  const [filtersSettings] = useSyncFilters();

  const filtersSettingsParsed = flatten(
    Object.entries(filtersSettings as FilterSettings)?.map((filter) => {
      if (!Array.isArray(filter[1])) return [{ [filter[0]]: filter[1] }];
      if (filter[0] === 'intervention' && filter[1].length === INTERVENTION_TYPES.length) {
        return [];
      }
      if (filter[0] !== 'intervention' && filter[1].length === AREAS.length) {
        return [];
      }
      return filter[1].map((f) => ({ [filter[0]]: f }));
    })
  );

  const hasMoreThanThree = filtersSettingsParsed.length > 3;
  const remainingFiltersCount = hasMoreThanThree ? filtersSettingsParsed.length - 3 : 0;
  const filtersToDisplay = hasMoreThanThree
    ? filtersSettingsParsed.slice(0, 3)
    : filtersSettingsParsed;

  return (
    <div className="space-y-2">
      {filtersToDisplay && !!filtersToDisplay.length && (
        <div className="space-y-2 text-xs text-gray-500">
          <span className="-tracking-wide">Filtered by</span>
          <ul className="flex flex-wrap gap-2">
            {filtersToDisplay.map((filter) => (
              <li key={Object.keys(filter)[0]}>
                <FiltersBadge
                  category={Object.keys(filter)[0] as FiltersType}
                  filterValue={Object.values(filter)[0] as string}
                />
              </li>
            ))}
          </ul>
          {hasMoreThanThree && <p>and {remainingFiltersCount} more</p>}
        </div>
      )}
    </div>
  );
}

'use client';

import type { FiltersType } from '@/containers/filters/types';

import FiltersBadge from './badge';

export default function BadgesContainer({
  key,
  hasMoreThanThree,
  remainingFiltersCount,
  filtersToDisplay,
}: {
  filtersToDisplay: unknown[];
  hasMoreThanThree: boolean;
  remainingFiltersCount: number;
  key: FiltersType[];
}) {
  return (
    filtersToDisplay &&
    !!filtersToDisplay.length && (
      <div key={key?.length} className="space-y-2 text-xs text-gray-500">
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
        {hasMoreThanThree && <p data-cy="remaning-filters">and {remainingFiltersCount} more</p>}
      </div>
    )
  );
}

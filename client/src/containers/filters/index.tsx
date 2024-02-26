'use client';

import { useCallback, Suspense } from 'react';

import flatten from 'lodash/flatten';
import { Filter } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import FiltersContent from '@/containers/filters/content';
import type { FiltersType, FilterSettings } from '@/containers/filters/types';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import FiltersBadge from './badge';
import { INTERVENTION_TYPES, PROJECTS, AREAS } from './constants';

export default function Filters() {
  const [filtersSettings, setFiltersToURL] = useSyncFilters();
  const handleResetFilters = useCallback(() => {
    setFiltersToURL({});
  }, [setFiltersToURL]);

  const filtersSettingsParsed = flatten(
    Object.entries(filtersSettings as FilterSettings)?.map((filter) => {
      if (!Array.isArray(filter[1])) return [];
      if (filter[0] === 'intervention' && filter[1].length === INTERVENTION_TYPES.length) {
        setFiltersToURL({
          ...filtersSettings,
          intervention: [],
        });
        return [];
      }
      if (filter[0] !== 'intervention' && filter[1].length === AREAS.length) {
        setFiltersToURL({
          ...filtersSettings,
          [filter[0]]: [],
        });
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
    <Suspense>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Combobox placeholder="Search project" options={PROJECTS} icon />
          <Dialog>
            <DialogTrigger aria-label="Show filters" asChild>
              <Button variant="outline" size="base" className="space-x-2">
                <Filter className="stroke-[1.5px]" />
                <span>Filters</span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="text-xl font-semibold leading-7">
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <FiltersContent />
              <DialogFooter>
                <button type="button" onClick={handleResetFilters}>
                  Clear all
                </button>
                <Button variant="primary" size="base" onClick={handleResetFilters}>
                  Show <span className="font-bold"> X </span>results
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {filtersToDisplay && !!filtersToDisplay.length && (
          <div className="text-xs text-gray-500">
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
            {hasMoreThanThree && <span>and {remainingFiltersCount} more</span>}
          </div>
        )}
      </div>
    </Suspense>
  );
}

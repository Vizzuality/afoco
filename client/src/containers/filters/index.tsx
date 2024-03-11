'use client';

import { useCallback, Suspense, useState } from 'react';

import flatten from 'lodash-es/flatten';
import { Filter, Search } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import FiltersContent from '@/containers/filters/content';
import type { FiltersType, FilterSettings } from '@/containers/filters/types';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import FiltersBadge from './badge';
import { INTERVENTION_TYPES, AREAS } from './constants';

export default function Filters() {
  const [filtersSettings, setFiltersToURL] = useSyncFilters();
  const handleResetFilters = useCallback(() => {
    setFiltersToURL({});
  }, [setFiltersToURL]);

  const [searchValue, setSearchValue] = useState('');
  console.info(searchValue);

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
    <Suspense>
      <div className="space-y-2">
        <div className="relative flex space-x-2">
          <Input
            placeholder="Search project by name"
            className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search size={24} className="absolute left-1 top-2" />

          <Dialog>
            <DialogTrigger aria-label="Show filters" asChild>
              <Button variant="outline" size="base" className="space-x-2">
                <Filter className="stroke-[1.5px]" />
                <span>Filters</span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="text-xl font-semibold leading-7 text-green-900">
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
    </Suspense>
  );
}

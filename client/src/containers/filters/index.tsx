'use client';

import { useCallback, Suspense } from 'react';

import { Filter } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import FiltersContent from '@/containers/filters/content';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Filters({ nrResults = 0 }: { nrResults: number }) {
  const [, setFiltersToURL] = useSyncFilters();
  const handleResetFilters = useCallback(() => {
    setFiltersToURL({});
  }, [setFiltersToURL]);

  return (
    <Suspense>
      <div className="space-y-2">
        <div className=" flex space-x-2">
          <Dialog>
            <DialogTrigger aria-label="Show filters" asChild>
              <Button variant="outline" size="base" data-cy="show-filters-btn">
                <Filter className="hidden stroke-[1.5px] xl:block" />
                <span>Filters</span>
              </Button>
            </DialogTrigger>

            <DialogContent overlay>
              <DialogHeader className="text-xl font-semibold leading-7 text-green-900">
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <FiltersContent />
              <DialogFooter>
                <button type="button" onClick={handleResetFilters} data-cy="clear-filters-button">
                  Clear all
                </button>
                <DialogClose>
                  <Button variant="primary" size="base">
                    <p>
                      Show <span className="font-bold"> {nrResults} </span> results
                    </p>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Suspense>
  );
}

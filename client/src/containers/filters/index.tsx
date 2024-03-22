'use client';

import { useCallback, Suspense } from 'react';

import { Filter } from 'lucide-react';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import FiltersContent from '@/containers/filters/content';

import { Button } from '@/components/ui/button';
import {
  Dialog,
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
              <Button variant="outline" size="base">
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
                  <p>
                    Show <span className="font-bold"> {nrResults} </span> results
                  </p>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Suspense>
  );
}

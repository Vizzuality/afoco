'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { useSetAtom } from 'jotai';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { hoveredProjectMapAtom } from '@/store';
import { tmpBboxAtom } from '@/store';

import { useGetProjects } from '@/types/generated/project';
import { Bbox } from '@/types/map';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import Filters from '@/containers/filters';
import ProjectItem from '@/containers/projects/item';

import { Input } from '@/components/ui/input';
import ContentLoader from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';

import FiltersSelected from '../filters/selected';

export default function ProjectsList() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const setTempBbox = useSetAtom(tmpBboxAtom);
  const [filtersSettings] = useSyncFilters();
  const setHoveredProjectList = useSetAtom(hoveredProjectMapAtom);

  const { data, isFetching, isFetched, isError } = useGetProjects(
    {
      populate: '*',
      filters: {
        name: {
          $containsi: searchValue,
        },
        countries: {
          name: {
            $in: filtersSettings?.country,
          },
        },
        intervention_types: {
          name: {
            $containsi: Array.isArray(filtersSettings?.intervention)
              ? filtersSettings?.intervention.map((i: string) => i.replace(/-/g, ' '))
              : [],
          },
        },
        project_indicator_fields: {
          $or: [
            {
              ...(filtersSettings.area_restored?.includes('>500') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_restored?.includes('<200') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_restored?.includes('200-500') && {
                indicator_name: 'area_reforested_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('>500') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('<200') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_protected?.includes('200-500') && {
                indicator_name: 'area_protected_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('>500') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $gt: 500,
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('<200') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $lt: 200,
                },
              }),
            },
            {
              ...(filtersSettings.area_plantation?.includes('200-500') && {
                indicator_name: 'area_plantation_total',
                filter_tag: {
                  $between: [200, 500],
                },
              }),
            },
          ],
        },
      },
    },
    {
      query: {
        select: (response) =>
          response?.data?.filter((project) => project.attributes?.project_code !== 'AFoCO_global'),
      },
    }
  );

  const handleHover = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const currentValue = e.currentTarget.getAttribute('data-value');
      setHoveredProjectList(currentValue);
    },
    [setHoveredProjectList]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const value = e.currentTarget?.getAttribute('data-bbox');
      if (value) {
        const currentValue = value.split(',').map((num) => parseFloat(num)) as Bbox;
        setTempBbox(currentValue);
      }
    },
    [setTempBbox]
  );

  const filtersLength = Object.entries(filtersSettings)
    .flat()
    .filter((el) => typeof el === 'object')
    .flat().length;

  return (
    <div className="no-scrollbar flex max-h-[75vh] flex-col space-y-2 overflow-y-auto">
      <div className="ml-1 mt-1 flex justify-between space-x-2 px-5">
        <div className="relative w-full">
          <Input
            type="search"
            placeholder="Search project"
            className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue || ''}
          />
          <Search size={24} className="absolute left-2 top-2" />
          {!!searchValue && (
            <button
              type="button"
              className="absolute right-3 top-3"
              aria-label="reset-search"
              onClick={() => setSearchValue(null)}
            >
              <X className="h-3.5 w-3.5 cursor-pointer text-yellow-900" />
            </button>
          )}
        </div>
        <Filters nrResults={data?.length as number} />
      </div>

      <FiltersSelected />

      <ContentLoader
        data={data}
        isPlaceholderData={false}
        isFetching={isFetching}
        isFetched={isFetched}
        isError={isError}
        loaderClassName="mt-28"
      >
        {/* To - Do add total of projects to API */}
        <p className="px-6 py-4 text-xs text-gray-500">
          Showing{' '}
          <span className="rounded-xl bg-yellow-200 px-1 text-yellow-700">{data?.length}</span> out
          of all 46 projects
        </p>
        <ScrollArea
          className={cn({
            'h-[67vh] px-5 2xl:h-[73vh]': true,
            'h-[60vh] 2xl:h-[68vh]': filtersLength >= 1,
            'h-[56vh] 2xl:h-[64vh]': filtersLength >= 2,
          })}
        >
          <div className="flex flex-col space-y-2">
            {data &&
              data.map((project) => (
                <button
                  type="button"
                  key={project?.id}
                  data-value={project?.attributes?.project_code}
                  data-bbox={project?.attributes?.bbox}
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  onMouseLeave={() => setHoveredProjectList(null)}
                >
                  <ProjectItem data={project} />
                </button>
              ))}
          </div>
        </ScrollArea>
      </ContentLoader>
    </div>
  );
}

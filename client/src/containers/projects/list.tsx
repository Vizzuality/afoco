'use client';
import { useState } from 'react';

import { Search } from 'lucide-react';

import { useGetProjects } from '@/types/generated/project';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import Filters from '@/containers/filters';
import ProjectItem from '@/containers/projects/item';

import { Input } from '@/components/ui/input';

import FiltersSelected from '../filters/selected';

export default function ProjectsList() {
  const [searchValue, setSearchValue] = useState('');
  const [filtersSettings] = useSyncFilters();

  console.log('FILTERS', filtersSettings.area_plantation);

  const { data } = useGetProjects(
    {
      populate: '*',
      filters: {
        name: {
          $contains: searchValue,
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
          // $or: [
          //   {
          //     ...(filtersSettings.area_plantation?.includes('>500') && {
          //       indicator_name: 'area_plantation_total',
          //       filter_tag: {
          //         $gt: 500,
          //       },
          //     }),
          //   },
          //   {
          //     ...(filtersSettings.area_plantation?.includes('<200') && {
          //       indicator_name: 'area_plantation_total',
          //       filter_tag: {
          //         $lt: 200,
          //       },
          //     }),
          //   },
          //   {
          //     ...(filtersSettings.area_plantation?.includes('200-500') && {
          //       indicator_name: 'area_plantation_total',
          //       filter_tag: {
          //         $between: [200, 500],
          //       },
          //     }),
          //   },
          // ],
          $or: [
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

  console.log('PROJECTS', data);

  return (
    <div className="no-scrollbar flex max-h-[75vh] flex-col space-y-2 overflow-y-auto">
      <div className="relative mx-1 mt-1 flex justify-between space-x-2">
        <Input
          placeholder="Search project by name"
          className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search size={24} className="absolute left-2 top-2" />
        <Filters nrResults={data?.length as number} />
      </div>
      <FiltersSelected />
      {data && data.map((project) => <ProjectItem key={project?.id} data={project} />)}
    </div>
  );
}

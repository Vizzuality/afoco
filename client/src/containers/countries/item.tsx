'use client';

import { MouseEvent, useCallback } from 'react';

import Flag from 'react-world-flags';

import Link from 'next/link';

import { useSetAtom } from 'jotai';

import { tmpBboxAtom } from '@/store';

import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';
import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';
import { Bbox } from '@/types/map';

import { useSyncQueryParams } from '@/hooks/datasets';

export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
  const setTempBbox = useSetAtom(tmpBboxAtom);
  const queryParams = useSyncQueryParams({ bbox: true });

  const { data: projectsCountIndicator } = useGetCountryIndicatorFields(
    {
      populate: '*',
      filters: {
        country: { id: data.id },
      },
    },
    {
      query: {
        select: (response) =>
          response.data?.find((item) => item.attributes?.indicator_name === 'projects_count'),
      },
    }
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

  return (
    <Link
      href={`/countries/${data.id}${queryParams}`}
      data-bbox={data.attributes?.bbox}
      data-cy="country-item"
      onClick={handleClick}
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 no-underline shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="flex items-center space-x-4">
        {data.attributes?.iso && (
          <Flag code={data.attributes.iso} height="32" width="40" className="rounded" />
        )}

        <h3>{data.attributes?.name}</h3>
      </div>

      {projectsCountIndicator?.attributes && (
        <p>
          <span className="font-semibold">
            {projectsCountIndicator?.attributes?.value as number}
          </span>{' '}
          {projectsCountIndicator?.attributes?.value === 1 ? 'project' : 'projects'}
        </p>
      )}
    </Link>
  );
}

'use client';

import { useCallback } from 'react';

import Flag from 'react-world-flags';

import { useRouter } from 'next/navigation';

import { useSetAtom } from 'jotai';

import { tmpBboxAtom } from '@/store';

import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';
import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';
import type { Bbox } from '@/types/map';

import { useSyncQueryParams } from '@/hooks/datasets';
export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
  const setTempBbox = useSetAtom(tmpBboxAtom);

  const queryParams = useSyncQueryParams();
  const { push } = useRouter();

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

  const handleClick = useCallback(() => {
    push(`/countries/${data.id}${queryParams}`);
    setTempBbox(data.attributes?.bbox as Bbox);
  }, [data, push, queryParams, setTempBbox]);

  return (
    <button
      data-cy="country-item-link"
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
    </button>
  );
}

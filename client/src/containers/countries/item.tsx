'use client';

import Link from 'next/link';

import getCountryIso2 from 'country-iso-3-to-2';

import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';
import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';

import { useSyncQueryParams } from '@/hooks/datasets';

import CountryFlag from '@/components/flag';

export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
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

  return (
    <Link
      href={`/countries/${data.id}${queryParams}`}
      data-cy="country-item"
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 no-underline shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="flex items-center space-x-4">
        {data.attributes?.iso && (
          <CountryFlag
            alt={data.attributes.iso}
            countryCode={getCountryIso2(data.attributes.iso || '') || ''}
            key={`${data.attributes.iso}`}
            className="rounded"
            style={{
              fontSize: '3em',
            }}
          />
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

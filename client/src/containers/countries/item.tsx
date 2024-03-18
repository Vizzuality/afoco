'use client';

import Flag from 'react-world-flags';

import Link from 'next/link';

import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';

import { useSyncQueryParams } from '@/hooks/datasets';

export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
  const queryParams = useSyncQueryParams();

  return (
    <Link
      href={`/countries/${data.id}${queryParams}`}
      data-cy="country-item-link"
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 no-underline shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="not-prose flex items-center space-x-4">
        {data.attributes?.iso && (
          <Flag code={data.attributes.iso} height="32" width="40" className="rounded" />
        )}

        <h3>{data.attributes?.name}</h3>
      </div>
      <p>
        <span className="font-semibold">32</span> projects
      </p>
    </Link>
  );
}

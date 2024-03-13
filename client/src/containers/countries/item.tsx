'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import * as qs from 'qs';

import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';

export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
  const searchParams = useSearchParams();
  const layersParams = searchParams.get('layers');
  const filtersParams = searchParams.get('filters');

  const queryParams = qs.stringify(
    { layers: layersParams, filters: filtersParams },
    { encode: false, addQueryPrefix: true, skipNulls: true }
  );

  return (
    <Link
      href={`/countries/bhutan${queryParams}`}
      data-cy="country-item-link"
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="flex items-center space-x-4">
        <Image
          src="/images/countries/placeholder.png"
          alt="Country Flag"
          className="rounded"
          width={40}
          height={32}
        />
        <h3>{data.attributes?.name}</h3>
      </div>
      <p>
        <span className="font-semibold">32</span> projects
      </p>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import * as qs from 'qs';

import { cn } from '@/lib/classnames';

import { CountryListResponseDataItem } from '@/types/generated/strapi.schemas';

export default function CountryItem({ data }: { data: CountryListResponseDataItem }) {
  const searchParams = useSearchParams();
  const layersParams = searchParams.get('layers');
  const filtersParams = searchParams.get('filters');

  const queryParams = qs.stringify(
    { layers: layersParams, filters: filtersParams },
    { encode: false, addQueryPrefix: true, skipNulls: true }
  );

  const FLAGS = {
    Bhutan: 'bt',
    ['Brunei Darussalam']: 'bn',
    Cambodia: 'kh',
    Indonesia: 'id',
    Kazakhstan: 'kz',
    ['Kyrgyz Republic']: 'kg',
    ['Lao PDR']: 'la',
    Malaysia: 'my',
    Mongolia: 'mn',
    Myanmar: 'mm',
    Philippines: 'ph',
    ['Republic of Korea']: 'kr',
    Singapore: 'sg',
    Thailand: 'th',
    ['Timor-Leste']: 'tl',
    ['Viet Nam']: 'vn',
  };

  return (
    <Link
      href={`/countries/${data.id}${queryParams}`}
      data-cy="country-item-link"
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="flex items-center space-x-4">
        <div
          className={cn({
            [`fib fi-${
              FLAGS[data.attributes?.name as keyof typeof FLAGS]
            } !h-8 !w-12 rounded bg-cover bg-[50%] bg-no-repeat`]: true,
          })}
        />

        <h3>{data.attributes?.name}</h3>
      </div>
      <p>
        <span className="font-semibold">32</span> projects
      </p>
    </Link>
  );
}

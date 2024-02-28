'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';
import * as qs from 'qs';

import { PANEL_OVERVIEW_ITEMS, RESUME_ITEMS } from '@/containers/countries/detail/constants';

export default function CountryDetailPanel() {
  const params = useParams<{ country: string }>();
  const searchParams = useSearchParams();
  const layersParams = searchParams.get('layers');
  const filtersParams = searchParams.get('filters');

  const queryParams = qs.stringify(
    { layers: layersParams, filters: filtersParams },
    { encode: false, addQueryPrefix: true, skipNulls: true }
  );

  // TODO: We will need to fetch data and check if slug exists
  if (!params.country) {
    return notFound();
  }
  return (
    <div className="p-6">
      <Link
        href={`/countries${queryParams}`}
        className="absolute top-8 z-10 flex items-center space-x-3 rounded px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-100"
      >
        <ArrowLeft className="h-4 w-4 text-yellow-900" />
        <p>Back</p>
      </Link>
      <div className="mt-16 flex space-x-2">
        <Image
          src="/images/countries/placeholder.png"
          alt="Country Flag"
          className="rounded"
          width={40}
          height={32}
        />
        <h2 className="text-xl">Bhutan</h2>
      </div>
      <p className="my-4 text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur. Vel odio tellus egestas et. Tellus et mattis magnis
        sit.
      </p>
      <div className="flex flex-col justify-center">
        {PANEL_OVERVIEW_ITEMS.map(({ title, value, note }) => (
          <div
            key={title}
            className="flex justify-between border-b-2 border-dotted border-green-50 py-4"
          >
            <p className="text-xs font-medium uppercase text-gray-500">{title}</p>
            <p className="text-sm text-yellow-900">
              {value} <span className="text-2xs text-gray-500">({note})</span>
            </p>
          </div>
        ))}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 py-4">
          {RESUME_ITEMS.map(({ title, icon, value, unit }) => (
            <div
              key={title}
              className="relative flex items-center space-x-6 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm"
            >
              <div className="flex flex-col">
                <div className="flex items-end space-x-0.5">
                  <p className="text-2xl font-extrabold text-green-400">{value}</p>
                  {unit && <p className="mb-0.5 text-base font-normal text-green-400">{unit}</p>}
                </div>
                <p>{title}</p>
              </div>
              <Image
                src={icon}
                alt={title}
                width={24}
                height={34}
                className="absolute right-4 top-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

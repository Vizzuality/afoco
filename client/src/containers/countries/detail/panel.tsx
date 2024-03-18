'use client';

import Markdown from 'react-markdown';
import Flag from 'react-world-flags';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';

import { ArrowLeft, Download, ExternalLink, Info } from 'lucide-react';
import * as qs from 'qs';
import remarkGfm from 'remark-gfm';

import { useGetCountriesId } from '@/types/generated/country';
import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';

import BubbleChart from '@/containers/charts/bubble';
import PieChart from '@/containers/charts/pie';
import { PANEL_OVERVIEW_ITEMS, RESUME_ITEMS } from '@/containers/countries/detail/constants';
import Share from '@/containers/share';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { communityBeneficiaries, funding, seedsPlanted, usefulLinks } from './mock';

export default function CountryDetailPanel() {
  const params = useParams<{ id: string }>();
  const { data } = useGetCountriesId(Number(params.id));

  const { data: indicators } = useGetCountryIndicatorFields(
    {
      populate: '*',
      filters: {
        country: { id: params.id },
      },
    } /* {
    query: {
      select: (response) => PARSEAR
    }
  } */
  );

  const searchParams = useSearchParams();
  const layersParams = searchParams.get('layers');
  const filtersParams = searchParams.get('filters');

  const queryParams = qs.stringify(
    { layers: layersParams, filters: filtersParams },
    { encode: false, addQueryPrefix: true, skipNulls: true }
  );

  if (!params.id) {
    return notFound();
  }
  return (
    <div className="p-6">
      <div className="absolute left-6 right-6 top-4 z-10 flex justify-between">
        <Link
          href={`/countries${queryParams}`}
          className="flex items-center space-x-3 rounded px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-100"
        >
          <ArrowLeft className="h-4 w-4 text-yellow-900" />
          <p>Back</p>
        </Link>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <Download className="text-yellow-900" size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={'left'} sideOffset={20}>
              <p className="text-sm text-yellow-900">Download country</p>
            </TooltipContent>
          </Tooltip>

          <Share />
        </div>
      </div>
      <div className="mt-12 flex items-center space-x-3">
        {data?.data?.attributes?.iso && (
          <Flag code={data?.data?.attributes.iso} height="40" width="48" className="rounded pt-5" />
        )}
        <h2 className="text-xl" data-cy="country-detail-name">
          {data?.data?.attributes?.name}
        </h2>
      </div>
      <p className="my-4 line-clamp-5 text-sm text-gray-500">
        In Buthan all natural resources are authorized and managed by the State. State Forest Area
        covers about 120.5 million hectares or 64% of its total land area, which includes primary
        forests, secondary forests, plantation forests, and non-forested
      </p>

      <Dialog>
        <DialogTrigger className="mb-4 flex items-center space-x-2">
          <h5 className="text-xs hover:underline">Read more</h5>
          <ExternalLink size={12} className="text-yellow-900" />
        </DialogTrigger>
        <DialogContent className="rounded-xl pb-1" overlay>
          <div className="flex flex-col space-y-8 px-4">
            <div className="mt-4 flex space-x-2">
              <Image
                src="/images/countries/placeholder.png"
                alt="Country Flag"
                className="rounded"
                width={40}
                height={32}
              />
              <h2 className="text-xl" data-cy="country-detail-name">
                Bhutan
              </h2>
            </div>
            <div className='after:rounded-b-4xl z-10 flex flex-col after:absolute after:bottom-0.5 after:left-0 after:h-10 after:w-full after:bg-gradient-to-b after:from-white/0 after:to-white/100 after:content-[""]'>
              <div className="no-scrollbar max-h-[65vh] overflow-y-auto pb-10 text-sm text-gray-900">
                <Markdown remarkPlugins={[remarkGfm]} className="prose">
                  {data?.data?.attributes?.description}
                </Markdown>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col justify-center">
        {PANEL_OVERVIEW_ITEMS.map(({ title, value, note }) => (
          <div
            key={title}
            className="flex h-10 items-center justify-between border-b-2 border-dotted border-green-50 py-4 first:border-t-2"
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

        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-6">
              <h3 className="text-base text-green-800">Funding</h3>
              <Info className="text-green-800" size={20} />
            </div>
            <div className="h-44">
              <PieChart data={funding} />
            </div>
          </div>

          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-6">
              <h3 className="text-base text-green-800">Seeds planted</h3>
              <Info className="text-green-800" size={20} />
            </div>
            <div className="space-y-2">
              {seedsPlanted.map(({ name, value }) => (
                <div key={name} className="flex items-center space-x-4 text-sm">
                  <p className="w-20 truncate">{name}</p>

                  <div className="w-56">
                    <div className="h-2 rounded-3xl bg-[#70CCB0]" style={{ width: value * 0.5 }} />
                  </div>

                  <p className="w-10 text-right font-extrabold">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-right text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-8">
              <h3 className="text-base text-green-800">Community beneficiaries</h3>
              <Info className="h-5 w-5 text-green-800" />
            </div>
            <BubbleChart data={communityBeneficiaries} />
          </div>
          <div className="flex flex-col space-y-2 pb-8 pt-4">
            <h3 className="text-base text-green-800">Useful links</h3>
            {usefulLinks.map(({ title, description, link }) => (
              <div
                key={title}
                className="flex w-full flex-col space-y-2 rounded-xl bg-white p-2 shadow-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <h4 className="text-sm text-yellow-900">{title}</h4>
                  <a href={link} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} className="text-yellow-900" />
                  </a>
                </div>
                <p className="mr-6 text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

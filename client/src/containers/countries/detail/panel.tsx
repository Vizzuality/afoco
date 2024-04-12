'use client';

import Markdown from 'react-markdown';
import Flag from 'react-world-flags';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import { X } from 'lucide-react';
import { ArrowLeft, Download, ExternalLink, Info } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import { formatCompactNumber } from '@/lib/utils/formats';
import { DescriptionWithoutMarkdown } from '@/lib/utils/markdown';

import { useGetCountriesId } from '@/types/generated/country';
import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';
import { Country, CountryCountryIndicatorFieldsDataItem } from '@/types/generated/strapi.schemas';

import { useSyncQueryParams } from '@/hooks/datasets';

import BarsChart from '@/containers/charts/bar';
import SingleBar from '@/containers/charts/single-bar';
import {
  PANEL_OVERVIEW_ITEMS,
  RESUME_ITEMS,
  totalInterventionArea,
} from '@/containers/countries/detail/constants';
import { usefulLinks } from '@/containers/countries/detail/constants';
import { COLUMNS, CSV_COLUMNS_ORDER } from '@/containers/countries/detail/constants';
import Share from '@/containers/share';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContentLoader from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function CountryDetailPanel() {
  const params = useParams<{ id: string }>();
  const { data, isFetching, isFetched, isError } = useGetCountriesId(Number(params.id));
  const {
    data: indicators,
    isFetching: indicatorsIsFetching,
    isFetched: indicatorsIsFetched,
    isError: indicatorIsFetched,
  } = useGetCountryIndicatorFields(
    {
      populate: '*',
      filters: {
        country: { id: params.id },
      },
    },
    {
      query: {
        select: (response) => {
          return Object.assign(
            {},
            ...(response.data ?? []).map((item) => ({
              [item.attributes?.indicator_name as string]: {
                value: item.attributes?.value,
                unit: item.attributes?.unit,
              },
            }))
          );
        },
      },
    }
  );
  const queryParams = useSyncQueryParams();
  const jsonToCsv = (json: CountryCountryIndicatorFieldsDataItem['attributes'] & Country) => {
    let csv = '';

    const parsedJsonData = [
      Object.entries(json ?? {})
        .map((entry) => {
          return { [entry[0]]: entry[1] };
        })
        .reduce(function (result, current) {
          return Object.assign(result, current);
        }, []),
    ];

    const headers = Object.keys(json ?? {}).filter((el) => COLUMNS.includes(el));
    headers.sort(
      (a: string, b: string) =>
        CSV_COLUMNS_ORDER[a as keyof typeof CSV_COLUMNS_ORDER] -
        CSV_COLUMNS_ORDER[b as keyof typeof CSV_COLUMNS_ORDER]
    );

    csv += headers.join(',') + '\n';

    parsedJsonData?.forEach(function (row: { [key: string]: number | object | string[] }) {
      const data = headers
        .map((header) => {
          if (Array.isArray(row[header])) return `"${row[header].toString()}"`;

          if (typeof row[header] === 'object' && !Array.isArray(row[header])) {
            return `"${JSON.stringify(row[header]).replace(/"/g, "'")}"`;
          }
          return JSON.stringify(row[header]);
        })
        .join(',');
      csv += data + '\n';
    });

    return csv;
  };

  const downloadCSVCountryData = () => {
    const dataToDownload = { ...indicators, ...data?.data?.attributes };

    const csvData = jsonToCsv(dataToDownload || {}); // Provide a default value of an empty object if data is undefined
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data?.data?.attributes?.name}.csv`;
    document.body.appendChild(a);
    a.click();
  };

  if (!params.id) {
    return notFound();
  }

  return (
    <div className="py-5 pt-0">
      <div className="bg-background absolute left-0 right-0 top-0 z-10 flex w-full justify-between rounded-t-3xl px-5 px-5 pt-4">
        <Link
          href={`/countries${queryParams}`}
          className="flex items-center space-x-2 rounded px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-100"
        >
          <ArrowLeft className="h-4 w-4 text-yellow-900" />
          <p className="leading-6">Back</p>
        </Link>
        {data?.data && indicators && (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="rounded-full" onClick={downloadCSVCountryData}>
                  <Download className="text-yellow-900" size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={'left'} sideOffset={20}>
                <p className="text-sm text-yellow-900">Download country</p>
              </TooltipContent>
            </Tooltip>

            <Share />
          </div>
        )}
      </div>

      <ContentLoader
        data={data?.data && indicators}
        isPlaceholderData={false}
        isFetching={isFetching || indicatorsIsFetching}
        isFetched={isFetched && indicatorsIsFetched}
        isError={isError || indicatorIsFetched}
        loaderClassName="mt-52"
      >
        <ScrollArea className="h-[94vh] px-5 2xl:h-[96vh]">
          <div className="mt-16 flex items-center space-x-3 pt-7">
            {data?.data?.attributes?.iso && (
              <Flag code={data?.data?.attributes.iso} height="40" width="48" className="rounded" />
            )}
            <h2 className="text-xl" data-cy="country-detail-name">
              {data?.data?.attributes?.name}
            </h2>
          </div>

          <p className="my-4 line-clamp-5 text-sm text-gray-500">
            <DescriptionWithoutMarkdown description={data?.data?.attributes?.description} />
          </p>

          <Dialog>
            <DialogTrigger className="mb-4 flex items-center space-x-2">
              <h5 className="text-xs hover:underline">Read more</h5>
              <ExternalLink size={12} className="text-yellow-900" />
            </DialogTrigger>
            <DialogContent className="rounded-xl pb-1" overlay>
              <div className="flex flex-col space-y-8 px-4">
                <div className="mt-4 flex space-x-2">
                  {data?.data?.attributes?.iso && (
                    <Flag
                      code={data?.data?.attributes.iso}
                      height="32"
                      width="40"
                      className="rounded"
                    />
                  )}
                  <p>{data?.data?.attributes?.name}</p>
                </div>
                <div className='after:rounded-b-4xl z-10 flex flex-col after:absolute after:bottom-0.5 after:left-0 after:h-10 after:w-full after:bg-gradient-to-t after:from-white/0 after:to-white/100 after:content-[""]'>
                  <div className="no-scrollbar max-h-[65vh] overflow-y-auto pb-10 text-sm text-gray-900">
                    <Markdown remarkPlugins={[remarkGfm]} className="prose markdown-links">
                      {data?.data?.attributes?.description}
                    </Markdown>
                  </div>
                </div>
              </div>
              <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent absolute right-8 top-9 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:text-green-900">
                <X className="h-4 w-4 text-yellow-400" />
              </DialogClose>
            </DialogContent>
          </Dialog>

          {indicators && (
            <div className="flex flex-col justify-center">
              {PANEL_OVERVIEW_ITEMS.map(({ title, value, note, percentage }) => {
                const unitValue = indicators[value]['unit'];
                return (
                  <div
                    key={title}
                    className="flex h-10 items-center justify-between border-b-2 border-dotted border-green-50 py-4 first:border-t-2"
                  >
                    <p className="text-xs font-medium uppercase text-gray-500">
                      {title} <span className="normal-case">({unitValue})</span>
                    </p>
                    <div className="flex items-end space-x-1">
                      <p className="text-sm text-yellow-900">
                        {formatCompactNumber(Math.round(indicators[value]['value']))}{' '}
                      </p>

                      <p className="text-2xs mb-[1.7px] flex text-gray-500">
                        {percentage && <span>({Math.round(indicators[percentage]['value'])}%</span>}
                        <span>{note}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="grid grid-cols-2 grid-rows-2 gap-2 py-4">
                {RESUME_ITEMS.map(({ title, icon, value }) => {
                  const unit = indicators[value]['unit'];
                  return (
                    <div
                      key={title}
                      className="relative flex items-center space-x-6 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-end space-x-0.5">
                          <p className="text-2xl font-extrabold text-green-400">
                            {indicators[value]['value']}
                          </p>

                          {unit && (
                            <p className="mb-0.5 text-base font-normal text-green-400">{unit}</p>
                          )}
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
                  );
                })}
              </div>

              <div className="flex flex-col space-y-2">
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="relative flex items-center justify-between">
                    <h3 className="text-base text-green-800">
                      Total funding{' '}
                      {indicators.country_funding.unit && (
                        <span>({indicators.country_funding.unit})</span>
                      )}
                    </h3>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                        <Info className="text-green-800" size={20} />
                      </TooltipTrigger>

                      <TooltipContent className="max-w-[200px] p-2">
                        <p className="text-sm text-yellow-900">
                          <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                            The total areas of project activities conducted in the AFoCO Member
                            Countries.
                          </Markdown>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="h-52">
                    <SingleBar data={indicators.country_funding} />
                  </div>
                </div>

                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-base text-green-800">Total intervention area</h3>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                        <Info className="text-green-800" size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[200px] p-2">
                        <p className="text-sm text-yellow-900">
                          <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                            The total areas of project activities conducted in the AFoCO Member
                            Countries.
                          </Markdown>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <p className="py-4 text-3xl font-extrabold">
                    {formatCompactNumber(indicators.intervention_area_total['value'])}{' '}
                    {indicators.intervention_area_total['unit']}
                  </p>

                  <div className="space-y-4">
                    {totalInterventionArea.map(({ name, value }) => (
                      <div key={name} className="space-between flex w-full">
                        <div className="flex w-full flex-col text-sm">
                          <p>{name}</p>

                          <div
                            className="h-2 rounded-3xl bg-[#FFCC73]"
                            style={{
                              width: !!indicators[value].value
                                ? `${
                                    (indicators[value].value * 100) /
                                    indicators.intervention_area_total['value']
                                  }%`
                                : '0%',
                            }}
                          />
                        </div>

                        <p className="w-10 text-right font-extrabold">
                          {indicators[value]['value']}
                        </p>
                      </div>
                    ))}
                    <div>
                      <p className="text-right text-xs text-gray-500">
                        {indicators.area_plantation_total['unit']}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-base text-green-800">Total beneficiaries</h3>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                        <Info className="text-green-800" size={20} />
                      </TooltipTrigger>

                      <TooltipContent className="max-w-[200px] p-2">
                        <p className="text-sm text-yellow-900">
                          <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                            The total number of short- and long-term jobs generated by the project
                            interventions in the AFoCO Member Countries
                          </Markdown>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <p className="py-4 text-3xl font-extrabold">
                    {formatCompactNumber(indicators.beneficiaries_total['value'])}
                  </p>
                  {indicators.beneficiaries && (
                    <div className="h-44">
                      <BarsChart
                        data={Object.entries(indicators.beneficiaries['value']).map(
                          ([year, uv]) => ({
                            year,
                            uv,
                          })
                        )}
                        barDataKey="uv"
                        barRadius={[20, 20, 20, 20]}
                        fillBar="#70CCB0"
                        margin={{
                          top: 2,
                          right: 10,
                          left: -20,
                          bottom: -4,
                        }}
                        xAxisDataKey="year"
                      />
                    </div>
                  )}
                </div>
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-base text-green-800">Total jobs</h3>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                        <Info className="text-green-800" size={20} />
                      </TooltipTrigger>

                      <TooltipContent className="max-w-[200px] p-2">
                        <p className="text-sm text-yellow-900">
                          <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                            The total number of short- and long-term jobs generated by the project
                            interventions in the AFoCO Member Countries.
                          </Markdown>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <p className="py-4 text-3xl font-extrabold">
                    {formatCompactNumber(indicators.jobs_total['value'])}
                  </p>
                  {indicators.jobs && (
                    <div className="h-44">
                      <BarsChart
                        data={Object.entries(indicators.jobs['value']).map(([year, uv]) => ({
                          year,
                          uv,
                        }))}
                        barDataKey="uv"
                        barRadius={[20, 20, 20, 20]}
                        fillBar="#70B6CC"
                        margin={{
                          top: 2,
                          right: 20,
                          left: -20,
                          bottom: -4,
                        }}
                        xAxisDataKey="year"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 pb-8 pt-4">
                  <h3 className="text-base text-green-800">Useful links</h3>
                  {usefulLinks.map(({ title, description, link }) => (
                    <div
                      key={title}
                      className="flex w-full flex-col space-y-2 rounded-xl bg-white p-2 shadow-sm"
                    >
                      <a
                        href={
                          link === 'gfw_link'
                            ? data?.data?.attributes?.gfw_link
                            : link === 'country_information_link'
                            ? data?.data?.attributes?.country_information_link
                            : link
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full cursor-pointer items-center justify-between"
                      >
                        <h4 className="text-sm text-yellow-900">{title}</h4>
                        <ExternalLink size={16} className="text-yellow-900" />
                      </a>
                      <p className="mr-6 text-xs text-gray-500">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </ContentLoader>
    </div>
  );
}

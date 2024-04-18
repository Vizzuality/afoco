'use client';
import Markdown from 'react-markdown';

import { Info } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import { formatCompactNumber } from '@/lib/utils/formats';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';

import BarsChart from '@/containers/charts/bar';

import ContentLoader from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import SingleBar from '../charts/single-bar';

import { totalInterventionArea } from './constants';

export default function Stats() {
  const { data, isFetching, isFetched, isError } = useGetIndicatorFields(
    {
      populate: '*',
      filters: {
        project: { project_code: 'AFoCO_global' },
      },
    },
    {
      query: {
        select: (response) =>
          Object.assign(
            {},
            ...(response.data ?? []).map((item) => ({
              [item.attributes?.indicator_name as string]: {
                value: item.attributes?.value,
                unit: item.attributes?.unit,
              },
            }))
          ),
      },
    }
  );

  return (
    <ContentLoader
      data={data}
      isPlaceholderData={false}
      isFetching={isFetching}
      isFetched={isFetched}
      isError={isError}
      loaderClassName="mt-28"
    >
      {data && (
        <div className="flex flex-col space-y-2">
          <h3 className="mb-2 px-5 text-lg font-extrabold text-gray-400">Overview</h3>
          <ScrollArea className="h-[69vh] px-5 2xl:h-[75vh]">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base text-green-800">
                      Total Project Funds (as of March 2024)
                    </h3>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                        <Info className="text-green-800" size={20} />
                      </TooltipTrigger>

                      <TooltipContent className="max-w-[200px] p-2">
                        <p className="text-sm text-yellow-900">
                          <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                            The total amount of funds invested in programs and projects in AFoCO
                            Member Countries is composed of AFoCO Funding (from the Korea Forest
                            Service), Other Funds (from other development aid agencies), and
                            National Contributions (in the form of either cash and/or in-kind
                            contributions from Member Countries).
                          </Markdown>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <SingleBar data={data?.project_funding} />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base text-green-800">Total intervention area</h3>
                    <Tooltip>
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
                    {formatCompactNumber(data.intervention_area_total['value'])}{' '}
                    {data.intervention_area_total['unit']}
                  </p>

                  <div className="space-y-4">
                    {totalInterventionArea.map(({ name, value }) => (
                      <div key={name} className="space-between flex w-full">
                        <div className="flex w-full flex-col text-sm">
                          <p>{name}</p>

                          <div
                            className="h-2 rounded-3xl bg-[#FFCC73]"
                            style={{
                              width: !!data[value]
                                ? `${
                                    (data[value].value * 100) /
                                    data.intervention_area_total['value']
                                  }%`
                                : '0%',
                            }}
                          />
                        </div>

                        <p className="w-10 text-right font-extrabold">
                          {formatCompactNumber(Math.round(data[value]['value']))}
                        </p>
                      </div>
                    ))}

                    <div>
                      <p className="text-right text-xs text-gray-500">ha</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base text-green-800">Total beneficiaries</h3>
                    <Tooltip>
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
                    {formatCompactNumber(data.beneficiaries_total['value'])}
                  </p>

                  <div className="h-44">
                    {data.beneficiaries && (
                      <BarsChart
                        data={Object.entries(data.beneficiaries['value']).map(([year, uv]) => ({
                          year,
                          uv,
                        }))}
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
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="w-full rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base text-green-800">Total jobs</h3>
                    <Tooltip>
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
                    {formatCompactNumber(data.jobs_total['value'])}
                  </p>{' '}
                  <div className="h-44">
                    {data.jobs && (
                      <BarsChart
                        data={Object.entries(data.jobs['value']).map(([year, uv]) => ({
                          year,
                          uv,
                        }))}
                        barDataKey="uv"
                        barRadius={[20, 20, 20, 20]}
                        fillBar="#70B6CC"
                        margin={{
                          top: 2,
                          right: 10,
                          left: -20,
                          bottom: -4,
                        }}
                        xAxisDataKey="year"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </ContentLoader>
  );
}

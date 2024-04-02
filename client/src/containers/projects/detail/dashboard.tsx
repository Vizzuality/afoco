'use client';

import Markdown from 'react-markdown';

import Image from 'next/image';

import { Info } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import { formatCompactNumber } from '@/lib/utils/formats';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';

import BarsChart from '@/containers/charts/bar';
import SingleBar from '@/containers/charts/single-bar';
import { DASHBOARD_OVERVIEW_RESUME_ITEMS } from '@/containers/projects/detail/constants';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { totalInterventionArea } from './constants';

export default function ProjectDashboard({ id }: { id: string }) {
  const { data: indicators } = useGetIndicatorFields(
    {
      populate: '*',
      filters: {
        project: { project_code: id },
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
    <div
      data-cy="project-dashboard"
      className="z-50 box-content h-full w-full rounded-3xl bg-neutral-50 p-6 shadow-md"
    >
      <h3 className="mb-2 text-xl font-extrabold text-gray-400">Overview</h3>

      {indicators && (
        <div className="mb-4 flex space-x-4">
          {DASHBOARD_OVERVIEW_RESUME_ITEMS.map(({ title, icon, value, unit }) => (
            <div
              key={title}
              className="flex w-1/2 items-center space-x-4 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-400 bg-green-200/10">
                <Image src={icon} alt={title} width={32} height={32} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end space-x-0.5">
                  <p className="text-5xl font-extrabold text-green-400">
                    {indicators[value].value}
                  </p>
                  {unit && (
                    <p className="mb-0.5 text-base font-normal text-green-400">
                      {indicators[value].unit}
                    </p>
                  )}
                </div>
                <p>{title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {indicators && (
        <div className="flex h-[70vh] w-full flex-col justify-between gap-4">
          <div className="flex h-1/2 w-full gap-4">
            <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-green-800">Total project value (USD)</h3>

                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                    <Info className="text-green-800" size={20} />
                  </TooltipTrigger>

                  <TooltipContent className="max-w-[200px] p-2" align="start" side="left">
                    <p className="text-sm text-yellow-900">
                      <Markdown remarkPlugins={[remarkGfm]} className="prose text-xs">
                        The total value invested to the projects in the AFoCO Member Countries.
                      </Markdown>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <SingleBar data={indicators.project_funding['value']} />
            </div>
            <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-green-800">Total intervention area</h3>
                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                    <Info className="text-green-800" size={20} />
                  </TooltipTrigger>

                  <TooltipContent className="max-w-[200px] p-2" align="start" side="left">
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
                {formatCompactNumber(
                  indicators.area_plantation_total['value'] +
                    indicators.area_protected_total['value'] +
                    indicators.area_reforested_total['value']
                )}{' '}
                {indicators.area_plantation_total['unit']}
              </p>

              <div className="space-y-3">
                {totalInterventionArea.map(({ name, value }) => (
                  <div key={name} className="space-between flex w-full items-end">
                    <div className="flex w-full flex-col text-sm">
                      <p>{name}</p>

                      <div
                        className="h-2 rounded-3xl bg-[#FFCC73]"
                        style={{
                          width: !!indicators[value]
                            ? `${
                                (indicators[value].value * 100) /
                                (indicators.area_plantation_total.value +
                                  indicators.area_protected_total.value +
                                  indicators.area_reforested_total.value)
                              }%`
                            : '0%',
                        }}
                      />
                    </div>

                    <p className="w-10 text-right font-extrabold">
                      {Math.round(indicators[value]['value'])}
                    </p>
                  </div>
                ))}
                <div>
                  <p className="text-right text-xs text-gray-500">ha</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-1/2 w-full gap-4">
            <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-green-800">Total beneficiaries</h3>
                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                    <Info className="text-green-800" size={20} />
                  </TooltipTrigger>

                  <TooltipContent className="max-w-[200px] p-2" align="start" side="left">
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
                {formatCompactNumber(indicators.beneficiaries_total['value']) || 0}
              </p>
              <div className="h-32">
                {indicators.beneficiaries && (
                  <BarsChart
                    data={Object.entries(indicators.beneficiaries['value']).map(([year, uv]) => ({
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
            <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-green-800">Total jobs</h3>
                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                    <Info className="text-green-800" size={20} />
                  </TooltipTrigger>

                  <TooltipContent className="max-w-[200px] p-2" align="start" side="left">
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
                {formatCompactNumber(indicators.jobs_total['value']) || 0}
              </p>
              <div className="h-32">
                {indicators.jobs && (
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
      )}
    </div>
  );
}

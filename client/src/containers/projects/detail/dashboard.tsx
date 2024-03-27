'use client';
import { useState } from 'react';

import Image from 'next/image';

import { Info } from 'lucide-react';

import { formatCompactNumber } from '@/lib/utils/formats';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';

import BarsChart from '@/containers/charts/bar';
import SingleBar from '@/containers/charts/single-bar';
import { DASHBOARD_OVERVIEW_RESUME_ITEMS } from '@/containers/projects/detail/constants';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
              [item.attributes?.indicator_name as string]: item.attributes?.value,
            }))
          ),
      },
    }
  );

  const [infoOpen, setInfoOpen] = useState(false);

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
                  <p className="text-5xl font-extrabold text-green-400">{indicators[value]}</p>
                  {unit && <p className="mb-0.5 text-base font-normal text-green-400">{unit}</p>}
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
                <Dialog>
                  <DialogTrigger onClick={() => setInfoOpen(true)}>
                    <Info className="text-green-800" size={20} />
                  </DialogTrigger>
                  {infoOpen && (
                    <DialogContent className="p-0">
                      <h3 className="px-6 pt-4 text-xl font-medium text-green-900">Info</h3>
                      <div className="border-b border-t border-gray-100 py-2.5">
                        <p className="px-6 text-sm text-yellow-900">
                          Lorem ipsum dolor sit amet consectetur. Ac in vel mauris lectus in. Cras
                          tellus aliquam amet quisque. Amet ut mi sed purus. Nulla adipiscing
                          commodo lectus sed vehicula. Convallis etiam placerat imperdiet nunc
                          tempus sit. Mi non habitant blandit cursus ullamcorper vitae. Aliquet
                          donec egestas vitae tincidunt nunc amet ultricies. Cras blandit mattis
                          etiam erat. Iaculis tellus euismod enim integer. Lorem ipsum dolor sit
                          amet consectetur. Ac in vel mauris lectus in. Cras tellus aliquam amet
                          quisque. Amet ut mi sed purus. Nulla adipiscing commodo lectus sed
                          vehicula. Convallis etiam placerat imperdiet nunc tempus sit. Mi non
                          habitant blandit cursus ullamcorper vitae. Aliquet donec egestas vitae
                          tincidunt nunc amet ultricies. Cras blandit mattis etiam erat. Iaculis
                          tellus euismod enim integer.
                        </p>
                      </div>
                      <div className="flex w-full px-6 pb-4">
                        <Button
                          variant="primary"
                          size="small"
                          className="ml-auto w-12"
                          onClick={() => setInfoOpen(false)}
                        >
                          Ok
                        </Button>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              <SingleBar data={indicators.project_funding} />
            </div>
            <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-green-800">Total intervention area</h3>
                <Info className="h-5 w-5 text-green-800" />
              </div>

              <p className="py-4 text-3xl font-extrabold">
                {formatCompactNumber(
                  indicators.area_plantation_total +
                    indicators.area_protected_total +
                    indicators.area_reforested_total
                )}{' '}
                ha
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
                                (indicators[value] * 100) /
                                (indicators.area_plantation_total +
                                  indicators.area_protected_total +
                                  indicators.area_reforested_total)
                              }%`
                            : '0%',
                        }}
                      />
                    </div>

                    <p className="w-10 text-right font-extrabold">
                      {Math.round(indicators[value])}
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
                <Info className="h-5 w-5 text-green-800" />
              </div>
              <p className="py-4 text-3xl font-extrabold">
                {formatCompactNumber(indicators.beneficiaries_total) || 0}
              </p>
              <div className="h-32">
                {indicators.beneficiaries && (
                  <BarsChart
                    data={Object.entries(indicators.beneficiaries).map(([year, uv]) => ({
                      year,
                      uv,
                    }))}
                    activeStyles={{
                      stroke: 'yellow',
                    }}
                    barDataKey="uv"
                    barRadius={[20, 20, 20, 20]}
                    fillBar="#70CCB0"
                    margin={{
                      top: 2,
                      right: 2,
                      left: -40,
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
                <Info className="h-5 w-5 text-green-800" />
              </div>
              <p className="py-4 text-3xl font-extrabold">
                {formatCompactNumber(indicators.jobs_total) || 0}
              </p>
              <div className="h-32">
                {indicators.jobs && (
                  <BarsChart
                    data={Object.entries(indicators.jobs).map(([year, uv]) => ({
                      year,
                      uv,
                    }))}
                    activeStyles={{
                      stroke: 'yellow',
                    }}
                    barDataKey="uv"
                    barRadius={[20, 20, 20, 20]}
                    fillBar="#70B6CC"
                    margin={{
                      top: 2,
                      right: 2,
                      left: -40,
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

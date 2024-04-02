'use client';
import Markdown from 'react-markdown';

import { Info } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import { formatCompactNumber } from '@/lib/utils/formats';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';

import BarsChart from '@/containers/charts/bar';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';

import SingleBar from '../charts/single-bar';

import { totalInterventionArea } from './constants';

export default function Stats() {
  const { data: indicators } = useGetIndicatorFields(
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
    indicators && (
      <div className="flex flex-col space-y-2">
        <h3 className="mb-2 text-lg font-extrabold text-gray-400">Overview</h3>
        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-green-800">Total projects value (USD)</h3>
              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                  <Info className="text-green-800" size={20} />
                </DialogTrigger>

                <DialogContent className="p-0">
                  <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
                    Total projects value (USD)
                  </h3>
                  <div className="border-b border-t border-gray-100 py-2.5">
                    <p className="px-6 text-sm text-yellow-900">
                      <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        The total value invested to the projects in the AFoCO Member Countries.
                      </Markdown>
                    </p>
                  </div>
                  <div className="flex w-full px-6 pb-4">
                    <DialogClose asChild>
                      <Button variant="primary" size="base" className="ml-auto w-12 self-end">
                        Ok
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>{' '}
            </div>
            <SingleBar data={indicators?.project_funding['value']} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-green-800">Total intervention area</h3>
              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                  <Info className="text-green-800" size={20} />
                </DialogTrigger>

                <DialogContent className="p-0">
                  <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
                    Total intervention area
                  </h3>
                  <div className="border-b border-t border-gray-100 py-2.5">
                    <p className="px-6 text-sm text-yellow-900">
                      <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        The total areas of project activities conducted in the AFoCO Member
                        Countries.
                      </Markdown>
                    </p>
                  </div>
                  <div className="flex w-full px-6 pb-4">
                    <DialogClose asChild>
                      <Button variant="primary" size="base" className="ml-auto w-12 self-end">
                        Ok
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>{' '}
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
                        width: !!indicators[value]
                          ? `${
                              (indicators[value].value * 100) /
                              indicators.intervention_area_total['value']
                            }%`
                          : '0%',
                      }}
                    />
                  </div>

                  <p className="w-10 text-right font-extrabold">
                    {formatCompactNumber(Math.round(indicators[value]['value']))}
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
              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                  <Info className="text-green-800" size={20} />
                </DialogTrigger>

                <DialogContent className="p-0">
                  <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
                    Total beneficiaries{' '}
                  </h3>
                  <div className="border-b border-t border-gray-100 py-2.5">
                    <p className="px-6 text-sm text-yellow-900">
                      <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        The total number of direct and indirect beneficiaries from the project
                        interventions in the country.
                      </Markdown>
                    </p>
                  </div>
                  <div className="flex w-full px-6 pb-4">
                    <DialogClose asChild>
                      <Button variant="primary" size="base" className="ml-auto w-12 self-end">
                        Ok
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>{' '}
            </div>
            <p className="py-4 text-3xl font-extrabold">
              {formatCompactNumber(indicators.beneficiaries_total['value'])}
            </p>

            <div className="h-44">
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
        </div>

        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-green-800">Total jobs</h3>
              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50">
                  <Info className="text-green-800" size={20} />
                </DialogTrigger>

                <DialogContent className="p-0">
                  <h3 className="px-6 pt-4 text-xl font-medium text-green-900">Total jobs</h3>
                  <div className="border-b border-t border-gray-100 py-2.5">
                    <p className="px-6 text-sm text-yellow-900">
                      <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        The total number of short- and long-term jobs generated by the project
                        interventions in the AFoCO Member Countries.
                      </Markdown>
                    </p>
                  </div>
                  <div className="flex w-full px-6 pb-4">
                    <DialogClose asChild>
                      <Button variant="primary" size="base" className="ml-auto w-12 self-end">
                        Ok
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>{' '}
            </div>
            <p className="py-4 text-3xl font-extrabold">
              {formatCompactNumber(indicators.jobs_total['value'])}
            </p>{' '}
            <div className="h-44">
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
    )
  );
}

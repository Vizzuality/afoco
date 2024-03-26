'use client';
import { Info } from 'lucide-react';

import { formatCompactNumber } from '@/lib/utils/formats';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';

import BarsChart from '@/containers/charts/bar';

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
              [item.attributes?.indicator_name as string]: item.attributes?.value,
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
              <Info className="text-green-800" size={20} />
            </div>
            <SingleBar data={indicators?.project_funding} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-green-800">Total intervention area</h3>
              <Info className="text-green-800" size={20} />
            </div>

            <p className="py-4 text-3xl font-extrabold">
              {formatCompactNumber(
                indicators.area_plantation_total +
                  indicators.area_protected_total +
                  indicators.area_reforested_total
              )}{' '}
              ha
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
                    {formatCompactNumber(Math.round(indicators[value]))}
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
              <Info className="text-green-800" size={20} />
            </div>
            <p className="py-4 text-3xl font-extrabold">
              {formatCompactNumber(indicators.beneficiaries_total)}
            </p>

            <div className="h-44">
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
                    left: -36,
                    bottom: -4,
                  }}
                  xAxisDataKey="year"
                  xAxisTicks={Object.keys(indicators.beneficiaries)}
                  yAxisTicks={[
                    '0',
                    (
                      Object.values(indicators?.beneficiaries as number[]).sort(
                        (a: number, b: number) => b - a
                      )[0] / 2
                    ).toString(),

                    Object.values(indicators?.beneficiaries as number[])
                      .sort((a: number, b: number) => b - a)[0]
                      .toString(),
                  ]}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="w-full rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-green-800">Total jobs</h3>
              <Info className="text-green-800" size={20} />
            </div>
            <p className="py-4 text-3xl font-extrabold">
              {formatCompactNumber(indicators.jobs_total)}
            </p>{' '}
            <div className="h-44">
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
                    left: -36,
                    bottom: -4,
                  }}
                  xAxisDataKey="year"
                  xAxisTicks={Object.keys(indicators.jobs)}
                  yAxisTicks={[
                    '0',
                    (
                      Object.values(indicators?.jobs as number[]).sort(
                        (a: number, b: number) => b - a
                      )[0] / 2
                    ).toString(),

                    Object.values(indicators?.jobs as number[])
                      .sort((a: number, b: number) => b - a)[0]
                      .toString(),
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

'use client';
import { Info } from 'lucide-react';

import { cn } from '@/lib/classnames';
import { formatCompactNumber } from '@/lib/utils/formats';

import BarsChart from '@/containers/charts/bar';

import { interventionArea, totalBeneficiariesData, totalProjectsValue } from './mock';

export default function Stats() {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="mb-2 text-lg font-extrabold text-gray-400">Overview</h3>
      <div className="flex flex-col space-y-2">
        <div className="w-full rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base text-green-800">Total projects value (USD)</h3>
            <Info className="text-green-800" size={20} />
          </div>
          <p className="py-4 text-3xl font-extrabold">
            {formatCompactNumber(totalProjectsValue.reduce((acc, curr) => acc + curr.value, 0))}
          </p>

          <div
            className="h-10 w-full rounded-[4px]"
            style={{
              background: `linear-gradient(to right, #70CCB0 0%, #70CCB0 ${
                (totalProjectsValue[0].value * 100) /
                totalProjectsValue.reduce((acc, curr) => acc + curr.value, 0)
              }%, #FFCC73 ${
                (totalProjectsValue[0].value * 100) /
                totalProjectsValue.reduce((acc, curr) => acc + curr.value, 0)
              }%, #FFCC73 ${
                (totalProjectsValue[1].value * 100) /
                totalProjectsValue.reduce((acc, curr) => acc + curr.value, 0)
              }%)`,
            }}
          />
          <div className="mt-2 flex w-full items-center justify-between text-xs text-gray-500">
            <p>0</p>
            <p>20</p>
            <p>40</p>
            <p>60</p>
            <p>80</p>
            <p>100</p>
          </div>
          <div className="mb-5 mt-4 flex flex-col space-y-2">
            {totalProjectsValue.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 text-sm">
                <div
                  className={cn({
                    'h-3 w-3 rounded-full': true,
                    'bg-[#70CCB0]': idx === 0,
                    'bg-[#FFCC73]': idx === 1,
                  })}
                />
                <p className="">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="w-full rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base text-green-800">Total intervention area</h3>
            <Info className="text-green-800" size={20} />
          </div>
          <p className="py-4 text-3xl font-extrabold">
            {interventionArea.reduce((acc, curr) => acc + curr.value, 0)} ha
          </p>
          <div className="space-y-2">
            {interventionArea.map(({ name, value }) => (
              <div key={name} className="flex items-center space-x-4 text-sm">
                <p className="w-32 truncate">{name}</p>

                <div className="w-44">
                  <div className="h-2 rounded-3xl bg-[#70CCB0]" style={{ width: value * 0.7 }} />
                </div>

                <p className="w-10 text-right font-extrabold">{value}</p>
              </div>
            ))}
            <div>
              <p className="text-right text-xs text-gray-500">Total</p>
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
            {totalBeneficiariesData.reduce((acc, curr) => acc + curr.uv, 0)}
          </p>
          <div className="h-44">
            <BarsChart
              data={totalBeneficiariesData}
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
              xAxisTicks={['2016', '2021', '2026']}
              yAxisTicks={['0', '50', '100']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

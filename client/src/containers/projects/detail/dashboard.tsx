'use client';
import { useState } from 'react';

import Image from 'next/image';

import { Info } from 'lucide-react';

import BarsChart from '@/containers/charts/bar';
import BubbleChart from '@/containers/charts/bubble';
import PieChart from '@/containers/charts/pie';
import { DASHBOARD_OVERVIEW_RESUME_ITEMS } from '@/containers/projects/detail/constants';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import {
  communityBeneficiaries,
  fundingInUSD,
  projectFundingInfrastructure,
  trainedPeoplePerYearData,
} from './mock';

export default function ProjectDashboard() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div
      data-cy="project-dashboard"
      className="z-50 box-content h-full w-full rounded-3xl bg-neutral-50 p-6 shadow-md"
    >
      <h3 className="mb-2 text-xl font-extrabold text-gray-400">Overview</h3>

      <div className="mb-4 flex space-x-4">
        {DASHBOARD_OVERVIEW_RESUME_ITEMS.map(({ title, icon, value, unit }) => (
          <div
            key={title}
            className="flex w-1/3 items-center space-x-4 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-400 bg-green-200/10">
              <Image src={icon} alt={title} width={32} height={32} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-end space-x-0.5">
                <p className="text-5xl font-extrabold text-green-400">{value}</p>
                {unit && <p className="mb-0.5 text-base font-normal text-green-400">{unit}</p>}
              </div>
              <p>{title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex h-fit w-full flex-col justify-between gap-4">
        <div className="flex w-full gap-4">
          <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-lg text-green-800">Project funding infrastructure</h3>
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
                        tellus aliquam amet quisque. Amet ut mi sed purus. Nulla adipiscing commodo
                        lectus sed vehicula. Convallis etiam placerat imperdiet nunc tempus sit. Mi
                        non habitant blandit cursus ullamcorper vitae. Aliquet donec egestas vitae
                        tincidunt nunc amet ultricies. Cras blandit mattis etiam erat. Iaculis
                        tellus euismod enim integer. Lorem ipsum dolor sit amet consectetur. Ac in
                        vel mauris lectus in. Cras tellus aliquam amet quisque. Amet ut mi sed
                        purus. Nulla adipiscing commodo lectus sed vehicula. Convallis etiam
                        placerat imperdiet nunc tempus sit. Mi non habitant blandit cursus
                        ullamcorper vitae. Aliquet donec egestas vitae tincidunt nunc amet
                        ultricies. Cras blandit mattis etiam erat. Iaculis tellus euismod enim
                        integer.
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
            {projectFundingInfrastructure.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b-2 border-dotted border-green-50 py-1.5 last:border-none last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <p className="text-xs font-semibold uppercase text-gray-500">{item.name}</p>
                  <Dialog>
                    <DialogTrigger>
                      <Info className="ext-green-800" size={12} />
                    </DialogTrigger>

                    <DialogContent className="p-0">
                      <h3 className="px-6 pt-4 text-xl font-medium text-green-900">Info</h3>
                      <div className="border-b border-t border-gray-100 py-2.5">
                        <p className="px-6 text-sm text-yellow-900">{item.info}Lorem ip</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-xs font-normal">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-6">
              <h3 className="text-lg text-green-800">Funding in USD</h3>
              <Info className="h-5 w-5 text-green-800" />
            </div>
            <div className="h-44">
              <PieChart data={fundingInUSD} />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-4">
              <h3 className="text-lg text-green-800">Trained people per year</h3>
              <Info className="h-5 w-5 text-green-800" />
            </div>
            <div className="h-44">
              <BarsChart
                data={trainedPeoplePerYearData}
                activeStyles={{
                  stroke: 'yellow',
                }}
                barDataKey="uv"
                fillBar="#70CCB0"
                margin={{
                  top: 2,
                  right: 2,
                  left: -40,
                  bottom: -4,
                }}
                xAxisDataKey="year"
                xAxisTicks={['2000', '2007', '2014']}
                yAxisTicks={['0', '50', '100']}
              />
            </div>
          </div>
          <div className="w-1/2 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-8">
              <h3 className="text-lg text-green-800">Community beneficiaries</h3>
              <Info className="h-5 w-5 text-green-800" />
            </div>
            <BubbleChart data={communityBeneficiaries} />
          </div>
        </div>
      </div>
    </div>
  );
}

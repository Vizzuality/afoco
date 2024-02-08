import { useState } from 'react';

import { useSetAtom } from 'jotai';
import { Info, X } from 'lucide-react';

import { dashboardAtom } from '@/store';

import { DASHBOARD_OVERVIEW_RESUME_ITEMS } from '@/containers/projects/detail/constants';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

export default function ProjectDashboard() {
  const [infoOpen, setInfoOpen] = useState(false);
  const setDashboard = useSetAtom(dashboardAtom);

  return (
    <div className="absolute bottom-2 right-6 top-2 z-10 box-content w-7/12 rounded-3xl bg-neutral-50 px-6 py-8 shadow-md">
      <div>
        <h3 className="mb-4 text-xl font-extrabold text-gray-400">Overview</h3>
        <button
          onClick={() => setDashboard(false)}
          className="focus:ring-ring absolute right-6 top-9 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-yellow-400" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div className="mb-6 flex space-x-6">
        {DASHBOARD_OVERVIEW_RESUME_ITEMS.map(({ title, icon, value, unit }) => (
          <div
            key={title}
            className="flex w-1/3 items-center space-x-6 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-400">
              <Icon icon={icon} className="h-8 w-8" />
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
      <div className="grid grid-cols-2 grid-rows-2 gap-6">
        <div className="rounded-xl bg-white bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-green-800">Project funding infrastructure</h3>
            <Dialog>
              <DialogTrigger onClick={() => setInfoOpen(true)}>
                <Info className="h-5 w-5 text-green-800" />
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
                      tincidunt nunc amet ultricies. Cras blandit mattis etiam erat. Iaculis tellus
                      euismod enim integer. Lorem ipsum dolor sit amet consectetur. Ac in vel mauris
                      lectus in. Cras tellus aliquam amet quisque. Amet ut mi sed purus. Nulla
                      adipiscing commodo lectus sed vehicula. Convallis etiam placerat imperdiet
                      nunc tempus sit. Mi non habitant blandit cursus ullamcorper vitae. Aliquet
                      donec egestas vitae tincidunt nunc amet ultricies. Cras blandit mattis etiam
                      erat. Iaculis tellus euismod enim integer.
                    </p>
                  </div>
                  <div className="flex w-full px-6 pb-4">
                    <Button
                      variant="default"
                      size="sm"
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
        </div>
        <div className="rounded-xl bg-white bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-green-800">Funding in USD</h3>
            <Info className="h-5 w-5 text-green-800" />
          </div>
        </div>
        <div className="rounded-xl bg-white bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-green-800">Trained people per year</h3>
            <Info className="h-5 w-5 text-green-800" />
          </div>
        </div>
        <div className="rounded-xl bg-white bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl text-green-800">Community beneficiaries</h3>
            <Info className="h-5 w-5 text-green-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

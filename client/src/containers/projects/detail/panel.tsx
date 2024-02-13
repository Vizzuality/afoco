'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { useAtom } from 'jotai';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { dashboardAtom } from '@/store';

import { PANEL_OVERVIEW_ITEMS } from '@/containers/projects/detail/constants';

import { Button } from '@/components/ui/button';

import ProjectDashboard from './dashboard';

export default function ProjectDetailPanel() {
  const [dashboard, setDashboard] = useAtom(dashboardAtom);

  return (
    <div className="no-scrollbar h-full overflow-x-hidden rounded-3xl bg-neutral-50 p-6 pb-40">
      <div className="absolute left-0 top-0 w-full">
        <div className="relative">
          <Image
            src="/images/projects/detail/placeholder.png"
            alt="AFOCO"
            width={300}
            height={300}
            className="w-full rounded-t-[24px]"
          />
          <h2 className="absolute bottom-6 mx-6 text-xl font-semibold text-white">
            Innovative Solutions for Climate Change and Biodiversity Landscape Strategy to Support
            SDGs in Indonesia
          </h2>
        </div>
      </div>

      <Link
        href="/projects"
        className="absolute top-8 z-10 flex items-center space-x-3 rounded px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-100"
      >
        <ArrowLeft className="h-4 w-4 text-yellow-900" />
        <p>Back</p>
      </Link>
      <div className="flex flex-col space-y-8">
        <p className="mt-72 pt-2 text-sm text-gray-500">
          The project will introduce innovative solutions for sustainable management practices and
          enhance the capacities of Forest Management Units (FMUs) and local communities on
          contributing to Indonesia’s emissions reduction targets and improve biodiversity
          landscapes to support the achievement of the Sustainable Development Goals (SDGs), in
          particular, SDGs 1, 8, 13 and 15.
        </p>
        <div>
          {PANEL_OVERVIEW_ITEMS.map(({ title, value }) => (
            <div
              key={title}
              className="flex justify-between border-b-2 border-dotted border-gray-400 py-4"
            >
              <p className="text-xs font-medium uppercase text-gray-500">{title}</p>
              <p className="text-sm text-yellow-900">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-medium uppercase text-yellow-900">Project Gallery</h4>
          <div className="flex space-x-1">
            <Image
              src="/images/projects/detail/placeholder.png"
              alt="AFOCO"
              width={170}
              height={170}
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            If you have pictures of this project to share, please sent them to{' '}
            <a className="underline hover:no-underline" href="mailto:email@afoco.com">
              email@afoco.com
            </a>
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="group fixed bottom-6 right-6 space-x-2"
            size="lg"
            onClick={() => {
              setDashboard(!dashboard);
            }}
          >
            <p className="w-36">{dashboard ? 'Hide dashboard' : 'Show dashboard'}</p>
            <ChevronRight className="h-4 w-4 text-yellow-900 group-hover:text-yellow-50" />
          </Button>
        </DialogTrigger>

        <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <ProjectDashboard />
        </DialogContent>
      </Dialog>
    </div>
  );
}

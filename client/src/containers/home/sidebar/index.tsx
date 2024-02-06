'use client';

import Image from 'next/image';

// import PROJECTS_SVG from 'svgs/sidebar/projects.svg?sprite';
// import Icon from '@/components/ui/icon';

import { useAtomValue, useSetAtom } from 'jotai';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { sidebarTabAtom } from '@/store';

export default function Sidebar() {
  const sidebarTab = useAtomValue(sidebarTabAtom);
  const setSidebarTab = useSetAtom(sidebarTabAtom);
  return (
    <div className="rounded-8xl absolute bottom-0 left-6 top-0 z-10 my-2 w-20 bg-yellow-700 py-10 text-xs text-yellow-50">
      <div className="h-[88%]">
        <div className="flex flex-col items-center pb-16">
          <Image src="/images/logo.svg" alt="logo" width={62} height={29} />
        </div>
        <ul className="flex h-full flex-col">
          <button
            className={cn({
              'rounded-8xl mx-2 flex flex-col items-center space-y-1 py-10 text-center': true,
              'bg-yellow-600': sidebarTab === 'projects',
            })}
            onClick={() => setSidebarTab('projects')}
          >
            <div className="h-6 w-6"></div>
            <p>Projects</p>
          </button>
          <button
            className={cn({
              'rounded-8xl mx-2 flex flex-col items-center space-y-1 py-10 text-center': true,
              'bg-yellow-600': sidebarTab === 'countries',
            })}
            onClick={() => setSidebarTab('countries')}
          >
            <div className="h-6 w-6"></div>
            <p>Country profile</p>
          </button>
          <button
            className={cn({
              'rounded-8xl mx-2 flex flex-col items-center space-y-1 py-10 text-center': true,
              'bg-yellow-600': sidebarTab === 'datasets',
            })}
            onClick={() => setSidebarTab('datasets')}
          >
            <div className="h-6 w-6"></div>
            <p>Datasets</p>
          </button>
          <div className="mt-auto flex flex-col items-center space-y-2">
            <HelpCircle className="text-yellow-50" size={24} strokeWidth={1} />
            <p className="text-base">Help</p>
          </div>
        </ul>
        {/* <Icon icon={PROJECTS_SVG} className="h-6 w-6" /> */}
      </div>
    </div>
  );
}

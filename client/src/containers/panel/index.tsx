'use client';

import { usePathname } from 'next/navigation';

import { useAtomValue, useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { dashboardAtom, sidebarTabAtom } from '@/store';
import { openAtom } from '@/store';

import Countries from '@/containers/countries';
import CountryDetailPanel from '@/containers/countries/detail/panel';
import Datasets from '@/containers/datasets';
import Projects from '@/containers/projects';
import ProjectDetailPanel from '@/containers/projects/detail/panel';

import { Button } from '@/components/ui/button';

export default function Panel() {
  const sidebarTab = useAtomValue(sidebarTabAtom);
  const dashboard = useAtomValue(dashboardAtom);
  const [open, setOpen] = useAtom(openAtom);

  const pathname = usePathname();

  return (
    <div
      className={cn({
        'rounded-4xl absolute bottom-0 top-0 my-2 flex w-full max-w-[400px] flex-col bg-white shadow-md transition-transform duration-500':
          true,
        'left-28 translate-x-0': open,
        'left-24 -translate-x-full': !open,
      })}
    >
      <div
        className={cn({
          'absolute left-full top-6 z-10': true,
          hidden: dashboard,
        })}
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-l-none"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ChevronLeft
            className={cn({
              'h-4 w-4 transition-transform': true,
              'rotate-180': !open,
            })}
          />
        </Button>
      </div>

      <div
        className={cn({
          'prose flex grow flex-col overflow-y-auto': true,
          'opacity-100': open,
          'opacity-0': !open,
        })}
      >
        {sidebarTab === 'projects' && pathname === '/' && <Projects />}
        {sidebarTab === 'countries' && pathname === '/' && <Countries />}
        {sidebarTab === 'datasets' && pathname === '/' && <Datasets />}
        {pathname.includes('/projects/') && <ProjectDetailPanel />}
        {pathname.includes('/countries/') && <CountryDetailPanel />}
      </div>
    </div>
  );
}

'use client';

import { useAtomValue, useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { sidebarTabAtom } from '@/store';
import { openAtom } from '@/store';

import Countries from '@/containers/countries';
import Datasets from '@/containers/datasets';
import Projects from '@/containers/projects';

import { Button } from '@/components/ui/button';

export default function Panel() {
  const sidebarTab = useAtomValue(sidebarTabAtom);
  const [open, setOpen] = useAtom(openAtom);

  return (
    <div
      className={cn({
        'rounded-4xl absolute bottom-0 top-0 my-2 flex w-full max-w-[400px] flex-col bg-white shadow-lg shadow-md transition-transform duration-500':
          true,
        'left-28 translate-x-0': open,
        'left-24 -translate-x-full': !open,
      })}
    >
      <div className="absolute left-full top-6 z-10">
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
        {sidebarTab === 'projects' && <Projects />}
        {sidebarTab === 'countries' && <Countries />}
        {sidebarTab === 'datasets' && <Datasets />}
      </div>
    </div>
  );
}

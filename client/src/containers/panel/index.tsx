'use client';

import { useEffect, useRef } from 'react';

import { useAtomValue, useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { dashboardAtom, hoveredProjectAtom } from '@/store';
import { openAtom } from '@/store';

import { Button } from '@/components/ui/button';

export default function Panel({ children }: { children: React.ReactNode }) {
  const dashboard = useAtomValue(dashboardAtom);
  const hoveredProject = useAtomValue(hoveredProjectAtom);
  const [open, setOpen] = useAtom(openAtom);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!hoveredProject) return;
    const element = document.getElementById(hoveredProject);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [hoveredProject]);

  return (
    <div
      className={cn({
        'rounded-4xl bg-background after:rounded-b-4xl before:rounded-t-4xl absolute bottom-0 top-0 z-10 my-2 flex w-full max-w-[400px] flex-col shadow-md transition-transform duration-500 before:absolute before:left-0 before:top-1 before:h-6 before:w-full before:bg-gradient-to-b before:from-white/100 before:to-white/0 before:content-[""] after:absolute after:bottom-1 after:left-0 after:h-6 after:w-full after:bg-gradient-to-b after:from-white/0 after:to-white/100 after:content-[""]':
          true,
        'left-[106px] translate-x-0': open,
        'left-24 -translate-x-full': !open,
      })}
    >
      <div
        className={cn({
          'absolute left-full top-9 z-10': true,
          hidden: dashboard,
        })}
      >
        <Button
          variant="ghost"
          size="small"
          className="rounded-l-none bg-yellow-100 px-1"
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
        ref={scrollRef}
        className={cn({
          'no-scrollbar my-1 flex grow scroll-pt-28 flex-col overflow-y-auto': true,
          'opacity-100': open,
          'opacity-0': !open,
        })}
      >
        {children}
      </div>
    </div>
  );
}

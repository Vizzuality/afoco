'use client';

import { useEffect, useRef } from 'react';

import { useAtomValue, useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { dashboardAtom, hoveredProjectMapAtom } from '@/store';
import { openAtom } from '@/store';

import { Button } from '@/components/ui/button';

export default function Panel({ children }: { children: React.ReactNode }) {
  const dashboard = useAtomValue(dashboardAtom);
  const hoveredProjectMap = useAtomValue(hoveredProjectMapAtom);
  const [open, setOpen] = useAtom(openAtom);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!hoveredProjectMap) return;
    const element = document.getElementById(hoveredProjectMap);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [hoveredProjectMap]);

  return (
    <div
      className={cn({
        'animate-in slide-in-from-left fade-in rounded-4xl bg-background after:rounded-b-4xl before:rounded-t-4xl absolute bottom-0 top-0 z-10 my-2 flex w-full max-w-[342px] flex-col shadow-md transition-transform duration-700 before:absolute before:left-0 before:top-1 before:h-6 before:w-full before:bg-gradient-to-b before:from-white/100 before:to-white/0 before:content-[""] after:absolute after:bottom-1 after:left-0 after:h-6 after:w-full after:bg-gradient-to-t after:from-white/0 after:to-white/100 after:content-[""] xl:max-w-[400px]':
          true,
        'left-20 translate-x-0 xl:left-[106px]': open,
        'left-[70px] -translate-x-full rounded-[42px] bg-transparent duration-[2000ms] before:content-[] after:content-[] xl:left-24':
          !open,
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
          className="h-10 w-6 rounded-l-none bg-yellow-100 px-[1px]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ChevronLeft
            strokeWidth={1.2}
            className={cn({
              'h-6 w-6 transition-transform': true,
              'rotate-180': !open,
            })}
          />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className={cn({
          'my-1 flex grow scroll-pt-28 flex-col': true,
          'opacity-100': open,
          'opacity-0': !open,
        })}
      >
        {children}
      </div>
    </div>
  );
}

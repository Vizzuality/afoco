'use client';

import { useAtomValue, useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { dashboardAtom } from '@/store';
import { openAtom } from '@/store';

import { Button } from '@/components/ui/button';

export default function Panel({ children }: { children: React.ReactNode }) {
  const dashboard = useAtomValue(dashboardAtom);
  const [open, setOpen] = useAtom(openAtom);

  return (
    <div
      className={cn({
        'rounded-4xl absolute bottom-0 top-0 z-10 my-2 flex w-full max-w-[400px] flex-col bg-white shadow-md transition-transform duration-500':
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
        {children}
      </div>
    </div>
  );
}
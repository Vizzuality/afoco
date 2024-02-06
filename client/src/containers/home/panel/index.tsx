'use client';

import { PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { openAtom } from '@/store';

import { Button } from '@/components/ui/button';

export default function Panel({ children }: PropsWithChildren) {
  const [open, setOpen] = useAtom(openAtom);

  return (
    <div
      className={cn({
        'rounded-4xl absolute bottom-0 left-28 top-0 my-2 flex w-full max-w-[400px] flex-col bg-white shadow-lg shadow-md transition-transform duration-500':
          true,
        'translate-x-0': open,
        '-translate-x-full': !open,
      })}
    >
      <div className="absolute left-full top-6 z-10">
        <Button
          variant="default"
          size="icon"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ChevronLeft
            className={cn({
              'h-6 w-6 transition-transform': true,
              'rotate-180': !open,
            })}
          />
        </Button>
      </div>

      <div className="prose flex grow flex-col overflow-y-auto">{children}</div>
    </div>
  );
}

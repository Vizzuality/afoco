'use client';

import * as React from 'react';

import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/classnames';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'focus-visible:ring-ring focus-visible:ring-offset-background peer inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-yellow-400 transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-yellow-50',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'drop-shadow-thumb pointer-events-none block h-3 w-3 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-px'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

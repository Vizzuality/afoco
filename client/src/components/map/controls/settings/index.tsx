'use client';

import { FC, useState } from 'react';

import { Settings } from 'lucide-react';

import { cn } from '@/lib/classnames';

import MapSettings from '@/containers/map/settings';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { CONTROL_BUTTON_STYLES } from '../constants';

import type { SettingsControlProps } from './types';

export const SettingsControl: FC<SettingsControlProps> = ({ className }: SettingsControlProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={cn('flex flex-col space-y-0.5', className)}>
      <Popover
        open={popoverOpen}
        onOpenChange={(open) => {
          setPopoverOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <button
            className={cn({
              [CONTROL_BUTTON_STYLES.default]: true,
              [CONTROL_BUTTON_STYLES.hover]: true,
              [CONTROL_BUTTON_STYLES.active]: true,
            })}
            aria-label="Map settings"
            type="button"
            data-cy="map-settings-button"
          >
            <Settings className="h-full w-full" />
          </button>
        </PopoverTrigger>

        <PopoverContent side="left" align="start" className="min-w-max rounded-3xl bg-white p-0">
          <MapSettings onClose={() => setPopoverOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SettingsControl;

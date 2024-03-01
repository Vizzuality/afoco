import { useCallback } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/classnames';

import { useSyncBasemap } from '@/hooks/datasets/sync-query';

export interface BasemapItemProps {
  label: string;
  value: string;
  preview: string;
}

const BasemapItem = ({ label, value, preview }: BasemapItemProps) => {
  const [basemapSettings, setMapSettings] = useSyncBasemap();
  const { basemap } = basemapSettings;

  const handleToggleBasemap = useCallback(() => {
    setMapSettings((prev) => ({
      ...prev,
      basemap: value,
    }));
  }, [value, setMapSettings]);

  return (
    <div className="mt-4 flex">
      <button
        className="group grow"
        type="button"
        onClick={handleToggleBasemap}
        data-cy={`${value}`}
      >
        <div className="flex h-full flex-col items-center justify-between">
          <div
            className={cn({
              'mb-5 h-[77px] w-[77px] overflow-hidden rounded shadow-lg transition-opacity group-hover:opacity-75 group-active:outline group-active:outline-2 group-active:outline-slate-400':
                true,
              'scale-125 overflow-hidden outline outline-2 outline-yellow-400 group-hover:opacity-100 group-active:outline-yellow-400':
                value === basemap,
            })}
          >
            <Image
              src={preview}
              alt={label}
              width={value === basemap ? 95 : 77}
              height={value === basemap ? 95 : 77}
            />
          </div>

          <span
            className={cn({
              'text-sm font-light leading-5': true,
            })}
          >
            {label}
          </span>
        </div>
      </button>
    </div>
  );
};

export default BasemapItem;

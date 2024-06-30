'use-client';

import type { Layer } from '@/types/generated/strapi.schemas';
import type { LayerSettings } from '@/types/layers';
import type { Legend } from '@/types/map';

import LegendSettings from '@/containers/legend-settings';

const ChoroplethLegendItem = ({
  name,
  legend_config,
  settings,
}: Layer & { settings: LayerSettings }) => {
  const { items } = legend_config as Legend;
  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="flex w-full items-start justify-between">
        <p className="max-w-[200px] text-xs capitalize">{name}</p>
        <LegendSettings settings={settings} />
      </div>
      <div>
        <ul className="flex w-full">
          {items.map(({ color }) => (
            <li
              key={`${color}`}
              className="h-2 flex-shrink-0"
              style={{
                width: `${100 / items.length}%`,
                backgroundColor: color,
              }}
            />
          ))}
        </ul>

        <ul className="mt-1 flex w-full">
          {items.map(({ value }) => (
            <li
              key={`${value}`}
              className="flex-shrink-0 text-start text-xs last:text-end"
              style={{
                width: `${100 / items.length}%`,
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChoroplethLegendItem;

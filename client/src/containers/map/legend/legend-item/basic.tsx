'use-client';

import type { Layer } from '@/types/generated/strapi.schemas';
import type { LayerSettings } from '@/types/layers';
import type { Legend } from '@/types/map';

import LegendSettings from '@/containers/legend-settings';

const BasicLegendItem = ({
  name,
  legend_config,
  settings,
}: Layer & { settings: LayerSettings }) => {
  const { items, notes } = legend_config as Legend;

  return (
    <div className="flex w-full">
      {items.length === 1 ? (
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full justify-between">
            <div className="flex w-full items-center space-x-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: items[0]?.color }} />
              <p className="text-xs capitalize">{name}</p>
            </div>
            <LegendSettings settings={settings} />
          </div>
          {items[0]?.notes && <p className="text-xs text-gray-500">{items[0]?.notes}</p>}
        </div>
      ) : (
        <div className="flex w-full justify-between">
          <div>
            <div className="flex w-full justify-between">
              <p className="text-xs capitalize">{name}</p>
              <LegendSettings settings={settings} />
            </div>
          </div>
          {items.map((item) => (
            <div key={item?.color} className="flex w-full items-center space-x-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <p className="text-xs capitalize">{item.value}</p>
            </div>
          ))}
          {notes && <p className="text-xs text-gray-500">{notes}</p>}
        </div>
      )}
    </div>
  );
};

export default BasicLegendItem;

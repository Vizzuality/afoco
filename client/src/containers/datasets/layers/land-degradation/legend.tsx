import { useGetLayersId } from '@/types/generated/layer';
import type { LayerSettings, LegendType } from '@/types/layers';

import LegendSettings from '@/containers/legend-settings';

export default function Legend({ settings }: { settings: LayerSettings }) {
  const { data } = useGetLayersId(Number(settings.id));

  if (!data?.data?.attributes) return null;

  const { legend_config, name } = data.data.attributes;
  const { items } = legend_config as LegendType;

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
}

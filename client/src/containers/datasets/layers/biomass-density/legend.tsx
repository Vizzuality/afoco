import { cn } from '@/lib/classnames';

import { useGetLayersId } from '@/types/generated/layer';
import { LayerSettings, LegendType } from '@/types/layers';

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

      <div className={cn({ 'flex flex-col': true })}>
        <div
          className={cn({
            'flex h-2 w-full': true,
          })}
          style={{
            backgroundImage: `linear-gradient(to right, ${items.map((i) => i.color).join(',')})`,
          }}
        />

        <ul className="mt-1 flex w-full justify-between">
          {items
            .filter(({ value }) => typeof value !== 'undefined' && value !== null)
            .map(({ value }) => (
              <li
                key={`${value}`}
                className={cn({
                  'flex-shrink-0 text-xs': true,
                })}
              >
                {value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

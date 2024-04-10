'use-client';

import { useGetLayersId } from '@/types/generated/layer';
import type { LayerSettings } from '@/types/layers';

import BasicLegendItem from './basic';
import ChoroplethLegendItem from './choropleth';
import GradientLegendItem from './gradient';

const MapLegendItem = ({ settings }: { settings: LayerSettings }) => {
  const { id } = settings;

  const { data } = useGetLayersId(Number(id));

  if (!data?.data?.attributes) return null;

  const { legend_config, name } = data.data.attributes;
  const { type, items } = legend_config;

  return (
    <div
      key={id}
      className="shadow-legend flex w-full items-center justify-between rounded bg-white px-4 py-2"
    >
      {type === 'gradient' && <GradientLegendItem name={name} items={items} settings={settings} />}
      {type === 'choropleth' && (
        <ChoroplethLegendItem name={name} items={items} settings={settings} />
      )}
      {type === 'basic' && <BasicLegendItem name={name} settings={settings} items={items} />}
    </div>
  );
};

export default MapLegendItem;

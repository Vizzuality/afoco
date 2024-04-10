'use-client';

import { useGetLayersId } from '@/types/generated/layer';
import type { LayerSettings } from '@/types/layers';
import type { Legend } from '@/types/map';

import BasicLegendItem from './basic';
import ChoroplethLegendItem from './choropleth';
import GradientLegendItem from './gradient';

const MapLegendItem = ({ settings }: { settings: LayerSettings }) => {
  const { id } = settings;

  const { data } = useGetLayersId(Number(id));

  if (!data?.data?.attributes) return null;

  const { legend_config, name } = data.data.attributes;
  const { type } = legend_config as Legend;

  return (
    <div
      key={id}
      className="shadow-legend flex w-full items-center justify-between rounded bg-white px-4 py-2"
    >
      {type === 'gradient' && (
        <GradientLegendItem name={name} legend_config={legend_config} settings={settings} />
      )}
      {type === 'choropleth' && (
        <ChoroplethLegendItem name={name} legend_config={legend_config} settings={settings} />
      )}
      {type === 'basic' && (
        <BasicLegendItem name={name} settings={settings} legend_config={legend_config} />
      )}
    </div>
  );
};

export default MapLegendItem;

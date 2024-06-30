import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { useLayers } from './hooks';

const SOURCE: SourceProps = {
  type: 'raster',
  tiles: [
    'https://tiles.globalforestwatch.org/gfw_soil_carbon_stocks/v20200724/default/{z}/{x}/{y}.png',
  ],
  id: 'soil-carbon-density',
  minzoom: 0,
  maxzoom: 12,
};

export const SoilCarbonDensityLayer = ({ beforeId, id }: LayerProps) => {
  const [layers] = useSyncLayers();
  const settings = layers.find((layer) => layer.id === id) || {
    visibility: 'visible',
    opacity: 1,
  };
  const LAYERS = useLayers({
    settings,
  });

  if (!SOURCE || !LAYERS.length) return null;

  return (
    <Source {...SOURCE}>
      {LAYERS.map((LAYER) => (
        <Layer {...LAYER} key={LAYER.id} beforeId={beforeId} id={LAYER.id} />
      ))}
    </Source>
  );
};

export default SoilCarbonDensityLayer;

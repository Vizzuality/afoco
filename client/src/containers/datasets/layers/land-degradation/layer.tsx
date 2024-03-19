import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useLayers } from './hooks';

const SOURCE: SourceProps = {
  type: 'vector',
  url: 'mapbox://afoco.76guc67g',
  id: 'land_degradation',
};

export const LandDegradationLayer = ({ beforeId, settings }: LayerProps) => {
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

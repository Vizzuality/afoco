import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useLayer } from './hooks';

const SOURCE: SourceProps = {
  type: 'vector',
  url: 'mapbox://afoco.7qdg3ppw',
  id: 'afoco_offices',
};

export const PointsOfInterestLayer = ({ beforeId }: LayerProps) => {
  const LAYER = useLayer();

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

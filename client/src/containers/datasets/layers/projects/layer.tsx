import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { useLayers } from './hooks';

const SOURCE: SourceProps = {
  promoteId: 'project_code',
  type: 'vector',
  url: 'mapbox://afoco.1xqij8g6',
  id: 'projects',
};

export const ProjectsLayer = ({ beforeId, id }: LayerProps) => {
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

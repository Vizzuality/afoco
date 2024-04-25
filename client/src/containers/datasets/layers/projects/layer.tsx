import { useEffect } from 'react';

import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { useLayers } from './hooks';

const SOURCE: SourceProps = {
  promoteId: 'project_code',
  type: 'vector',
  url: 'mapbox://afoco.25x9bxct',
  id: 'projects',
};

export const ProjectsLayer = ({ beforeId, id, onAdd, onRemove }: LayerProps) => {
  const [layers] = useSyncLayers();

  const settings = layers.find((layer) => layer.id === id) || {
    visibility: 'visible',
    opacity: 1,
  };
  const LAYERS = useLayers({
    settings,
  });

  useEffect(() => {
    const ids = LAYERS.map((layer) => layer.id);
    onAdd && onAdd(ids);
    return () => onRemove && onRemove(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers, onAdd, onRemove]);

  if (!SOURCE || !LAYERS.length) return null;

  return (
    <Source {...SOURCE}>
      {LAYERS.map((LAYER) => (
        <Layer {...LAYER} key={LAYER.id} beforeId={beforeId} id={LAYER.id} />
      ))}
    </Source>
  );
};

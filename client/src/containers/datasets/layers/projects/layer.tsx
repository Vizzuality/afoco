import { Layer, Source, SourceProps } from 'react-map-gl';

import type { LayerProps } from '@/types/layers';

import { useLayers } from './hooks';

const SOURCE: SourceProps = {
  promoteId: 'project_code',
  type: 'vector',
  url: 'mapbox://afoco.agmzsef7',
  id: 'projects',
};

export const ProjectsLayer = ({ beforeId, settings }: LayerProps) => {
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

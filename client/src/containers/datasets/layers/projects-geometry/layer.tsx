import { Layer, Source } from 'react-map-gl';

import { GeoJSONSourceRaw, GeoJSONSourceOptions } from 'mapbox-gl';

import type { LayerProps } from '@/types/layers';

import { useLayers } from './hooks';
import mockData from './mock.json';

const GEOJSON = mockData as GeoJSON.FeatureCollection;

const SOURCE: GeoJSONSourceRaw & GeoJSONSourceOptions & { id: string } = {
  type: 'geojson',
  data: GEOJSON,
  id: 'projects',
  promoteId: 'ID',
};

export const ProjectsGeometryLayer = ({ beforeId, settings }: LayerProps) => {
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

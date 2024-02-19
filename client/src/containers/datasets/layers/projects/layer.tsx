import { useMemo } from 'react';

import { Layer, LayerProps, Source } from 'react-map-gl';

import { GeoJSONSourceRaw, GeoJSONSourceOptions, SymbolLayer } from 'mapbox-gl';

import mockData from './mock.json';

const GEOJSON = mockData as GeoJSON.FeatureCollection;

const SOURCE: GeoJSONSourceRaw & GeoJSONSourceOptions = {
  type: 'geojson',
  data: GEOJSON,
};

export const ProjectsLayer = ({ beforeId, id }: LayerProps) => {
  const LAYER: SymbolLayer = useMemo(() => {
    return {
      id: 'projects-layer',
      type: 'symbol',
      paint: {},
      layout: {
        'icon-size': 0.75,
        'icon-image': 'marker',
        'icon-allow-overlap': true,
        'icon-keep-upright': true,
        'icon-anchor': 'bottom',
      },
    };
  }, []);

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} />
    </Source>
  );
};

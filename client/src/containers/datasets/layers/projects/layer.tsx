import { Layer, LayerProps, Source } from 'react-map-gl';

import { GeoJSONSourceRaw, GeoJSONSourceOptions, CircleLayer } from 'mapbox-gl';

import mockData from './mock.json';

const GEOJSON = mockData as GeoJSON.FeatureCollection;

const SOURCE: GeoJSONSourceRaw & GeoJSONSourceOptions = {
  type: 'geojson',
  data: GEOJSON,
};

type Settings = {
  opacity: number;
  visibility: boolean;
};

export const ProjectsLayer = ({
  beforeId,
  settings,
}: {
  beforeId: LayerProps['beforeId'];
  id: LayerProps['id'];
  settings: Settings;
}) => {
  const LAYERS: CircleLayer[] = [
    {
      id: 'points_shadow',
      type: 'circle',
      paint: {
        'circle-radius': 32,
        'circle-color': '#ccc',
        'circle-blur': 1,
      },
    },
    {
      id: 'projects',
      type: 'circle',
      paint: {
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 9,
        'circle-radius': 10,
        'circle-color': '#176252',
      },
      layout: {
        visibility: settings.visibility ? 'visible' : 'none',
      },
    },
  ];

  if (!SOURCE || !LAYERS.length) return null;

  return (
    <Source {...SOURCE}>
      {LAYERS.map((LAYER) => (
        <Layer {...LAYER} key={LAYER.id} beforeId={beforeId} />
      ))}
    </Source>
  );
};

import MapboxDraw, { DrawModeChangeEvent } from '@mapbox/mapbox-gl-draw';
import { useControl, ControlPosition } from 'react-map-gl';
import { useEffect } from 'react';

import { Layer } from 'mapbox-gl';

const DRAWING_STYLES: Layer[] = [
  // ACTIVE (being drawn)
  // line stroke
  {
    id: 'gl-draw-line',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#00857F',
      'line-width': 3,
    },
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': 'transparent',
      'fill-outline-color': '#00857F',
      'fill-opacity': 0.1,
    },
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#00857F',
      'line-width': 3,
    },
  },
  // vertex point halos
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 5,
      'circle-color': 'white',
      'circle-stroke-width': 0.5,
      'circle-stroke-color': 'hsla(0, 0%, 0%, 0.15)',
    },
  },
  // vertex points
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 5,
      'circle-color': 'white',
      'circle-stroke-width': 0.5,
      'circle-stroke-color': 'hsla(0, 0%, 0%, 0.15)',
    },
  },

  // INACTIVE (static, already drawn)
  // line stroke
  {
    id: 'gl-draw-line-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#000',
      'line-width': 3,
    },
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill-static',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    paint: {
      'fill-color': '#000',
      'fill-outline-color': '#000',
      'fill-opacity': 0.1,
    },
  },
  // polygon outline
  {
    id: 'gl-draw-polygon-stroke-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#000',
      'line-width': 3,
    },
  },
] satisfies Layer[];

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;
  onCreate?: (event: { features: GeoJSON.Feature[] }) => void;
  onUpdate?: (event: { features: GeoJSON.Feature[]; action: string }) => void;
  onDelete?: (event: { features: GeoJSON.Feature[] }) => void;
  onModeChange?: (event: DrawModeChangeEvent) => void;
  displayControlsDefault?: boolean;
  customPolygon?: GeoJSON.FeatureCollection;
  onSetCustomPolygon?: (customPolygon) => void;
  styles?: typeof DRAWING_STYLES;
};

export const MapDraw = (props: DrawControlProps) => {
  console.log(props, 'map props');
  const drawRef = useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      props.onCreate && map.on('draw.create', props.onCreate);
      props.onUpdate && map.on('draw.update', props.onUpdate);
      props.onDelete && map.on('draw.delete', props.onDelete);
      props.onModeChange && map.on('draw.modechange', props.onModeChange);
    },

    {
      position: props.position,
    }
  );

  const { onSetCustomPolygon, customPolygon } = props;

//   useEffect(() => {
//     if (!customPolygon) {
//       console.log({ customPolygon }, 'customPolygon iside useEffect');
//       drawRef.changeMode('draw_polygon');
//     }
//   }, [drawRef, customPolygon]);

  useEffect(() => {
    if (!drawRef) return null;
    if (customPolygon) {
      drawRef.add(customPolygon);

      if (onSetCustomPolygon) {
        onSetCustomPolygon(customPolygon);
      }
    }
  }, [onSetCustomPolygon, customPolygon, drawRef]);

  return null;
};

export default MapDraw;

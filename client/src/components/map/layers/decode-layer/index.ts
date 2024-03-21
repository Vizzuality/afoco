import { RasterSource } from 'react-map-gl';

import { GeoBoundingBox, TileLayer } from '@deck.gl/geo-layers/typed';
import { BitmapLayer } from '@deck.gl/layers/typed';
import GL from '@luma.gl/constants';

import type { LayerId } from '@/types/layers';

import DecodeExtension from './extension';

export interface DecodeLayerProps {
  source: RasterSource;
  id: LayerId;
  visibility: boolean;
  decodeFunction: string;
  decodeParams: Record<string, unknown>;
  opacity: number;
}

class DecodeLayer {
  constructor({ source, id, visibility, decodeFunction, decodeParams, opacity }: DecodeLayerProps) {
    return new TileLayer<
      unknown,
      {
        decodeFunction: DecodeLayerProps['decodeFunction'];
        decodeParams: DecodeLayerProps['decodeParams'];
      }
    >({
      id,
      data: source.tiles,
      tileSize: source.tileSize ?? 256,
      minZoom: source.minzoom,
      maxZoom: source.maxzoom,
      visible: visibility,
      opacity,
      refinementStrategy: 'no-overlap',
      decodeFunction,
      decodeParams,
      renderSubLayers: (subLayer) => {
        const {
          id: subLayerId,
          data: subLayerData,
          tile: subLayerTile,
          visible: subLayerVisible,
          opacity: subLayerOpacity,
        } = subLayer;

        const { zoom } = subLayerTile;
        const { west, south, east, north } = subLayerTile.bbox as GeoBoundingBox;

        if (subLayerData) {
          return new BitmapLayer({
            id: subLayerId,
            image: subLayerData,
            bounds: [west, south, east, north],
            textureParameters: {
              [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
              [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
              [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
              [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
            },
            zoom,
            visible: subLayerVisible,
            opacity: subLayerOpacity,
            decodeParams,
            decodeFunction,
            extensions: [new DecodeExtension()],
            updateTriggers: {
              decodeParams,
              decodeFunction,
            },
          });
        }
        return null;
      },
    });
  }
}

export default DecodeLayer;

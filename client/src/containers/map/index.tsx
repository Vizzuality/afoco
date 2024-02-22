'use client';

import { useCallback, useMemo } from 'react';

import { LngLatBoundsLike, MapLayerMouseEvent, useMap } from 'react-map-gl';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useAtomValue, useSetAtom, useAtom } from 'jotai';

import {
  bboxAtom,
  cursorAtom,
  layersInteractiveAtom,
  layersInteractiveIdsAtom,
  popupAtom,
  tmpBboxAtom,
} from '@/store';

import { useGetLayers } from '@/types/generated/layer';
import { LayerTyped } from '@/types/layers';
import { Bbox } from '@/types/map';

import Popup from '@/containers/map/popup';
import MapSettings from '@/containers/map/settings';
import MapSettingsManager from '@/containers/map/settings/manager';

import Map from '@/components/map';
import Controls from '@/components/map/controls';
import SettingsControl from '@/components/map/controls/settings';
import ZoomControl from '@/components/map/controls/zoom';
import { CustomMapProps } from '@/components/map/types';

const LayerManager = dynamic(() => import('@/containers/map/layer-manager'), {
  ssr: false,
});

const Legend = dynamic(() => import('@/containers/map/legend'), {
  ssr: false,
});

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
  initialViewState: {
    longitude: 0,
    latitude: 20,
    zoom: 2,
    pitch: 0,
    bearing: 0,
    bounds: [68.711178, -11.476973, 131.333249, 21.087406],
  },
  minZoom: 2,
  maxZoom: 20,
};

export default function MapContainer() {
  const { id, initialViewState, minZoom, maxZoom } = DEFAULT_PROPS;

  const { [id]: map } = useMap();
  const { push } = useRouter();

  const layersInteractive = useAtomValue(layersInteractiveAtom);
  const layersInteractiveIds = useAtomValue(layersInteractiveIdsAtom);
  const [cursor, setCursor] = useAtom(cursorAtom);

  const setPopup = useSetAtom(popupAtom);

  const [bbox, setBbox] = useAtom(bboxAtom);
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);

  const { data: layersInteractiveData } = useGetLayers(
    {
      filters: {
        id: {
          $in: layersInteractive,
        },
      },
    },
    {
      query: {
        enabled: !!layersInteractive.length,
      },
    }
  );

  const tmpBounds: CustomMapProps['bounds'] = useMemo(() => {
    if (tmpBbox) {
      return {
        bbox: tmpBbox,
        options: {
          padding: {
            top: 50,
            bottom: 50,
            // left: sidebarOpen ? 640 + 50 : 50,
            left: 50,
            right: 50,
          },
        },
      };
    }
  }, [tmpBbox]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMapViewStateChange = useCallback(() => {
    if (map) {
      const b = map
        .getBounds()
        .toArray()
        .flat()
        .map((v: number) => {
          return parseFloat(v.toFixed(2));
        }) as Bbox;
      setBbox(b);
      setTmpBbox(null);
    }
  }, [map, setBbox, setTmpBbox]);

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      if (
        layersInteractive.length &&
        layersInteractiveData?.data &&
        layersInteractiveData?.data.some((l) => {
          const attributes = l.attributes as LayerTyped;
          return attributes?.interaction_config?.events.some((ev) => ev.type === 'click');
        })
      ) {
        const p = Object.assign({}, e, { features: e.features ?? [] });
        setPopup(p);
      }

      if (e.features && e.features[0]) {
        push(`/projects/${e.features[0].properties?.slug}`);
      }
    },
    [layersInteractive, layersInteractiveData, setPopup, push]
  );

  let hoveredStateId: string | null = null;
  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const ProjectsLayer = e?.features && e?.features.find(({ layer }) => layer.id === 'projects');

      // *ON MOUSE ENTER
      if (e.features && e.features[0] && map) {
        setCursor('pointer');
      }

      if (ProjectsLayer && map) {
        if (hoveredStateId !== null) {
          map?.setFeatureState(
            {
              source: 'projects',
              id: hoveredStateId,
            },
            { hover: false }
          );
        }

        hoveredStateId = ProjectsLayer?.id as string;
        map?.setFeatureState(
          {
            source: 'projects',
            id: hoveredStateId,
          },
          { hover: true }
        );
      }

      // *ON MOUSE LEAVE
      if (!ProjectsLayer) {
        setCursor('grab');

        map?.setFeatureState(
          {
            source: 'projects',
            id: hoveredStateId,
          },
          { hover: false }
        );
        hoveredStateId = null;
      }
    },
    [setCursor, map, hoveredStateId]
  );

  return (
    <div className="absolute left-0 top-0 h-screen w-screen">
      <Map
        id={id}
        data-cy="map"
        initialViewState={{
          ...initialViewState,
          ...(bbox && {
            bounds: bbox as LngLatBoundsLike,
          }),
        }}
        bounds={tmpBounds}
        cursor={cursor}
        minZoom={minZoom}
        maxZoom={maxZoom}
        mapStyle="mapbox://styles/layer-manager/clj8fgofm000t01pjcu21agsd?fresh=true"
        interactiveLayerIds={layersInteractiveIds}
        onClick={handleMapClick}
        onMapViewStateChange={handleMapViewStateChange}
        onMouseMove={handleMouseMove}
      >
        {() => (
          <>
            <Controls className="absolute right-5 top-12 z-40 sm:right-6 sm:top-6">
              <ZoomControl />

              <SettingsControl>
                <MapSettings />
              </SettingsControl>
            </Controls>

            <LayerManager />

            <Popup />

            <MapSettingsManager />

            <Legend />
          </>
        )}
      </Map>
    </div>
  );
}

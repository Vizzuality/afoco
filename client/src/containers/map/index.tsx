'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LngLatBoundsLike, MapLayerMouseEvent, useMap } from 'react-map-gl';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import bbox from '@turf/bbox';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';

import { bboxAtom, hoveredProjectAtom, layersInteractiveIdsAtom, tmpBboxAtom } from '@/store';

import { Bbox } from '@/types/map';

import { useSyncZoom } from '@/hooks/datasets/sync-query';

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

  const params = useParams<{ id: string }>();
  const [, setZoom] = useSyncZoom();

  const layersInteractiveIds = useAtomValue(layersInteractiveIdsAtom);
  const setHoveredProject = useSetAtom(hoveredProjectAtom);
  const [cursor, setCursor] = useState<'grab' | 'pointer'>('grab');

  const [bboxA, setBbox] = useAtom(bboxAtom);
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);

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

  useEffect(() => {
    if (!params.id && map && initialViewState && initialViewState.bounds) {
      map.fitBounds(initialViewState.bounds, { padding: 100 });
    }
  }, [params.id, map, tmpBbox, setBbox, initialViewState]);

  const handleMapViewStateChange = useCallback(() => {
    if (map) {
      setZoom(parseFloat(map.getZoom().toFixed(2)));
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
  }, [map, setBbox, setTmpBbox, setZoom]);

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      if (e.features && e.features[0] && map) {
        push(`/projects/${e.features[0].properties?.ID}`);
        const bboxTurf = bbox(e.features[0]) as LngLatBoundsLike;
        map.fitBounds(bboxTurf, { padding: 100, maxZoom: 6 });
      }
    },
    [map, push]
  );

  let hoveredStateId: string | null = null;
  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const ProjectsLayer = e?.features && e?.features.find(({ layer }) => layer.id === 'projects');

      // *ON MOUSE ENTER
      if (e.features && e.features[0] && map) {
        setCursor('pointer');
        setHoveredProject(e.features[0].properties?.ID);
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

      if (e.features?.length === 0) {
        setCursor('grab');
      }

      if (!ProjectsLayer && map && hoveredStateId) {
        setHoveredProject(null);

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
          ...(bboxA && {
            bounds: bboxA as LngLatBoundsLike,
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
              <SettingsControl />
            </Controls>

            <LayerManager />

            <MapSettingsManager />

            <Legend />
          </>
        )}
      </Map>
    </div>
  );
}

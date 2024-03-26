'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LngLatBoundsLike, MapLayerMouseEvent, useMap } from 'react-map-gl';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import bbox from '@turf/bbox';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';

import { bboxAtom, hoveredProjectAtom, layersInteractiveIdsAtom, tmpBboxAtom } from '@/store';

import { Bbox } from '@/types/map';

import { useSyncQueryParams } from '@/hooks/datasets';

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
  const queryParams = useSyncQueryParams();

  const { [id]: map } = useMap();
  const { push } = useRouter();
  const params = useParams<{ id: string }>();

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
      const ProjectData = e.features && e.features.find(({ layer }) => layer.id === 'projects');
      if (e.features && e.features.length && map) {
        if (ProjectData) {
          push(`/projects/${ProjectData.properties?.project_code}${queryParams}`);
        }
        const bboxTurf = bbox(e.features[0]) as LngLatBoundsLike;
        map.fitBounds(bboxTurf, { padding: 100, maxZoom: 9 });
      }
    },
    [map, push, queryParams]
  );

  let hoveredStateIdProjectsCircle: string | null = null;

  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const ProjectsLayer = e?.features && e?.features.find(({ layer }) => layer.id === 'projects');
      // *ON MOUSE ENTER
      if (e.features && map && ProjectsLayer) {
        setCursor('pointer');
        setHoveredProject(ProjectsLayer.properties?.project_code);
      }

      if (ProjectsLayer && map) {
        if (hoveredStateIdProjectsCircle !== null) {
          map?.setFeatureState(
            {
              sourceLayer: 'afoco_locations_full',
              source: 'projects',
              id: hoveredStateIdProjectsCircle,
            },
            { hover: false }
          );
        }

        hoveredStateIdProjectsCircle = ProjectsLayer?.properties?.project_code as string;
        map?.setFeatureState(
          {
            sourceLayer: 'afoco_locations_full',
            source: 'projects',
            id: hoveredStateIdProjectsCircle,
          },
          { hover: true }
        );
      }

      // *ON MOUSE LEAVE

      if (e.features?.length === 0) {
        setCursor('grab');
      }

      if (!ProjectsLayer && map && hoveredStateIdProjectsCircle) {
        setHoveredProject(null);

        map?.setFeatureState(
          {
            sourceLayer: 'afoco_locations_full',
            source: 'projects',
            id: hoveredStateIdProjectsCircle,
          },
          { hover: false }
        );
        hoveredStateIdProjectsCircle = null;
      }
    },
    [setCursor, map, hoveredStateIdProjectsCircle]
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
        mapStyle="mapbox://styles/afoco/clsnhf69q005s01pk9czq8d8v?fresh=0"
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

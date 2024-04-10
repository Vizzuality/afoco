'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LngLatBoundsLike, MapLayerMouseEvent, useMap } from 'react-map-gl';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import bbox from '@turf/bbox';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { MapboxGeoJSONFeature } from 'mapbox-gl';

import { bboxAtom, hoveredProjectMapAtom, layersInteractiveIdsAtom, tmpBboxAtom } from '@/store';

import { useGetProjects } from '@/types/generated/project';
import { Bbox } from '@/types/map';

import { useSyncQueryParams } from '@/hooks/datasets';

import PopupContainer from '@/containers/map/popup';
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
  const [locationPopUp, setLocationPopUp] = useState<{
    position: { x: number; y: number } | null;
    popup: number[] | null;
    info: string | null;
  }>({
    position: null,
    popup: null,
    info: null,
  });

  const { [id]: map } = useMap();
  const { push } = useRouter();
  const params = useParams<{ id: string }>();

  const layersInteractiveIds = useAtomValue(layersInteractiveIdsAtom);
  const setHoveredProjectMap = useSetAtom(hoveredProjectMapAtom);
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

  const { data: projectTitle } = useGetProjects(
    {
      populate: 'name, project_code',
    },
    {
      query: {
        select: (response) =>
          response?.data
            ?.map((project) => project.attributes)
            .find((project) => project?.project_code === locationPopUp.info)?.name,
      },
    }
  );

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
      const ProjectsDataGeometry = e.features?.find(({ layer }) => layer.id === 'projects_fill');
      if (e.features && e.features.length && map) {
        if (ProjectData || ProjectsDataGeometry) {
          push(
            `/projects/${
              ProjectData?.properties?.project_code ||
              ProjectsDataGeometry?.properties?.project_code
            }${queryParams}`
          );
        }
        const bboxTurf = bbox(e.features[0]) as LngLatBoundsLike;
        map.fitBounds(bboxTurf, { padding: 100, maxZoom: 9 });
      }
    },
    [map, push, queryParams]
  );

  let hoveredStateIdProjectsCircle: string | null = null;
  let hoveredStateIdProjectsFill: string | null = null;

  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const findLayer = (layerId: string) => e?.features?.find(({ layer }) => layer.id === layerId);
      const ProjectsLayer = findLayer('projects_circle');
      const ProjectsFillLayer = findLayer('projects_fill');

      const handleLayerInteraction = (
        layer: MapboxGeoJSONFeature | undefined,
        sourceLayer: string,
        stateIdVar: any | null
      ) => {
        if (layer && map) {
          setCursor('pointer');

          const projectCode = layer.properties?.project_code;
          setHoveredProjectMap(projectCode);
          setLocationPopUp({
            popup: [e?.lngLat.lat, e?.lngLat.lng],
            position: { x: e.point.x, y: e.point.y },
            info: projectCode,
          });

          if (stateIdVar !== null) {
            map.setFeatureState(
              { sourceLayer, source: 'projects', id: stateIdVar },
              { hover: false }
            );
          }

          stateIdVar = projectCode;
          map.setFeatureState({ sourceLayer, source: 'projects', id: stateIdVar }, { hover: true });
        }
      };

      handleLayerInteraction(ProjectsLayer, 'areas_centroids_c', hoveredStateIdProjectsCircle);
      handleLayerInteraction(ProjectsFillLayer, 'areas_centroids_l', hoveredStateIdProjectsFill);

      // *ON MOUSE LEAVE
      if (e.features?.length === 0) {
        setCursor('grab');
        setHoveredProjectMap(null);
      }

      if (!ProjectsLayer && map && hoveredStateIdProjectsCircle) {
        map.setFeatureState(
          {
            sourceLayer: 'areas_centroids_c',
            source: 'projects',
            id: hoveredStateIdProjectsCircle,
          },
          { hover: false }
        );
        hoveredStateIdProjectsCircle = null;
      }

      if (!ProjectsFillLayer && map && hoveredStateIdProjectsFill) {
        map.setFeatureState(
          { sourceLayer: 'areas_centroids_l', source: 'projects', id: hoveredStateIdProjectsFill },
          { hover: false }
        );
        hoveredStateIdProjectsFill = null;
      }
    },
    [setCursor, map, hoveredStateIdProjectsCircle, hoveredStateIdProjectsFill]
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
        mapStyle="mapbox://styles/afoco/clsnhf69q005s01pk9czq8d8v"
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
            {locationPopUp && locationPopUp.popup && (
              <PopupContainer
                longitude={locationPopUp?.popup[1]}
                latitude={locationPopUp?.popup[0]}
                info={projectTitle}
                header="Project Name"
              />
            )}
          </>
        )}
      </Map>
    </div>
  );
}

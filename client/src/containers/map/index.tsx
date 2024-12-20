'use client';

import { useCallback, useMemo, useState } from 'react';

import { LngLatBoundsLike, MapLayerMouseEvent, useMap, Marker } from 'react-map-gl';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import bbox from '@turf/bbox';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';

import { hoveredProjectMapAtom, layersInteractiveIdsAtom, openAtom, tmpBboxAtom } from '@/store';

import { useGetProjects } from '@/types/generated/project';
import { Bbox } from '@/types/map';

import { useSyncQueryParams } from '@/hooks/datasets';
import { useSyncBbox } from '@/hooks/datasets/sync-query';

import PopupContainer from '@/containers/map/popup';
import MapSettingsManager from '@/containers/map/settings/manager';

import Map from '@/components/map';
import { DEFAULT_BBOX } from '@/components/map/constants';
import Controls from '@/components/map/controls';
import SettingsControl from '@/components/map/controls/settings';
import ZoomControl from '@/components/map/controls/zoom';
import { CustomMapProps } from '@/components/map/types';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
    bounds: DEFAULT_BBOX as Bbox,
  },
  minZoom: 2,
  maxZoom: 20,
};

const INITIAL_PROJECTS_POPUP = {
  position: null,
  popup: null,
  info: [],
};

export default function MapContainer() {
  const { id, initialViewState, minZoom, maxZoom } = DEFAULT_PROPS;
  const queryParams = useSyncQueryParams();
  const [locationPopUp, setLocationPopUp] = useState<{
    position: { x: number; y: number } | null;
    popup: number[] | null;
    info: string[] | null;
  }>(INITIAL_PROJECTS_POPUP);

  const { [id]: map } = useMap();
  const { push } = useRouter();

  const layersInteractiveIds = useAtomValue(layersInteractiveIdsAtom);
  const setHoveredProjectMap = useSetAtom(hoveredProjectMapAtom);
  const [cursor, setCursor] = useState<'grab' | 'pointer'>('grab');
  const [bboxFromURL, setBboxFromURL] = useSyncBbox();

  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);
  const sidebarOpen = useAtomValue(openAtom);
  const tmpBounds: CustomMapProps['bounds'] = useMemo(() => {
    if (tmpBbox) {
      return {
        bbox: tmpBbox,
        options: {
          padding: {
            top: 50,
            bottom: 50,
            left: sidebarOpen ? 550 : 50,
            right: 50,
          },
          maxZoom: 9,
        },
      };
    }
  }, [tmpBbox, sidebarOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: ProjectInfo } = useGetProjects(
    {
      populate: 'name, project_code',
    },
    {
      query: {
        select: (response) =>
          response?.data
            ?.map((project) => project.attributes)
            .filter(
              (project): project is { project_code: string; name: string } =>
                !!project?.project_code &&
                !!project?.name &&
                !!locationPopUp.info?.includes(project.project_code ?? '')
            )
            ?.map((p) => ({
              id: p.project_code,
              name: p.name,
            })),
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
      setBboxFromURL(b);
      setTmpBbox(null);
    }
  }, [map, setBboxFromURL, setTmpBbox]);

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const ProjectData =
        e.features && e.features.find(({ layer }) => layer.id === 'projects_circle');
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
        // map.fitBounds(bboxTurf, { padding: 100, maxZoom: 9 });
        setTmpBbox(bboxTurf as Bbox);
      }
    },
    [map, push, queryParams, setTmpBbox]
  );

  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      // Track hovered features as arrays
      let hoveredProjectsCircle = [];
      let hoveredProjectsFill = [];

      // Filter features by layer
      const ProjectsLayer =
        e?.features && e?.features.filter(({ layer }) => layer.id === 'projects_circle');
      const ProjectsFillLayer =
        e?.features && e?.features.filter(({ layer }) => layer.id === 'projects_fill');

      // ON MOUSE ENTER: Handle Projects Circle
      if (e.features && map && ProjectsLayer?.length) {
        hoveredProjectsCircle = ProjectsLayer.map((p) => p?.properties?.project_code);

        setCursor('pointer');
        setHoveredProjectMap(hoveredProjectsCircle);
        setLocationPopUp({
          popup: [e?.lngLat.lat, e?.lngLat.lng],
          position: {
            x: e.point.x,
            y: e.point.y,
          },
          info: hoveredProjectsCircle,
        });

        // Reset all previous hovered states
        hoveredProjectsCircle.forEach((id) => {
          map?.setFeatureState(
            {
              sourceLayer: 'areas_centroids_c_v202410',
              source: 'projects',
              id,
            },
            { hover: true }
          );
        });
      }

      // ON MOUSE ENTER: Handle Projects Fill
      if (e.features && map && ProjectsFillLayer?.length) {
        hoveredProjectsFill = ProjectsFillLayer.map((p) => p?.properties?.project_code);
        setCursor('pointer');
        setHoveredProjectMap(hoveredProjectsFill);
        setLocationPopUp({
          popup: [e?.lngLat.lat, e?.lngLat.lng],
          position: {
            x: e.point.x,
            y: e.point.y,
          },
          info: hoveredProjectsFill,
        });

        // Reset all previous hovered states
        hoveredProjectsFill.forEach((id) => {
          map?.setFeatureState(
            {
              sourceLayer: 'areas_centroids_l_v202410',
              source: 'projects',
              id,
            },
            { hover: true }
          );
        });
      }

      // ON MOUSE LEAVE: Reset Feature States
      if (!ProjectsLayer && map) {
        hoveredProjectsCircle.forEach((id) => {
          map?.setFeatureState(
            {
              sourceLayer: 'areas_centroids_c_v202410',
              source: 'projects',
              id,
            },
            { hover: false }
          );
        });
        hoveredProjectsCircle = [];
      }

      if (!ProjectsFillLayer && map) {
        hoveredProjectsFill.forEach((id) => {
          map?.setFeatureState(
            {
              sourceLayer: 'areas_centroids_l_v202410',
              source: 'projects',
              id,
            },
            { hover: false }
          );
        });
        hoveredProjectsFill = [];
      }

      // Reset cursor and popup on empty features
      if (e.features?.length === 0) {
        setCursor('grab');
        setHoveredProjectMap([]);
        setLocationPopUp(INITIAL_PROJECTS_POPUP);
      }
    },
    [setCursor, setHoveredProjectMap, setLocationPopUp, map]
  );

  return (
    <div className="relative left-0 top-0 h-screen w-screen">
      <Map
        id={id}
        data-cy="map"
        initialViewState={{
          ...initialViewState,
          ...(bboxFromURL && {
            bounds: bboxFromURL as LngLatBoundsLike,
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
            <Marker latitude={17.143622599404814} longitude={96.0012404711645} anchor="bottom">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="flex items-center justify-center rounded-full p-2">
                  <Image src="/images/pin.svg" alt="AFoCO RETC" width={19.76} height={24.25} />
                </TooltipTrigger>

                <TooltipContent className="max-w-[200px] p-2">
                  <p className="text-xs text-yellow-900">AFoCO RETC</p>
                </TooltipContent>
              </Tooltip>
            </Marker>
            <Marker latitude={37.52292545640524} longitude={126.92946965767372} anchor="bottom">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="flex items-center justify-center rounded-full p-2">
                  <Image
                    src="/images/pin.svg"
                    alt="Asian Forest Cooperation Organization (AFoCO)"
                    width={19.76}
                    height={24.25}
                  />{' '}
                </TooltipTrigger>

                <TooltipContent className="max-w-[200px] p-2">
                  <p className="text-xs text-yellow-900">
                    Asian Forest Cooperation Organization (AFoCO)
                  </p>
                </TooltipContent>
              </Tooltip>
            </Marker>

            <Legend />

            {locationPopUp.popup && (
              <PopupContainer
                longitude={locationPopUp?.popup[1]}
                latitude={locationPopUp?.popup[0]}
                info={ProjectInfo}
                header={ProjectInfo?.length && ProjectInfo?.length > 1 ? 'Projects' : 'Project'}
              />
            )}
          </>
        )}
      </Map>
    </div>
  );
}

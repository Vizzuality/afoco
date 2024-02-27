import { atom } from 'jotai';
import { MapLayerMouseEvent } from 'mapbox-gl';

type Settings = {
  opacity: number;
  visibility: 'none' | 'visible';
};

type LayerSettings = Record<string, Settings>;

type EmptyObject = Record<string, never>;

type MapSettings = {
  basemap: string;
  labels: string;
  boundaries: boolean;
  roads: boolean;
};

export type LayerId =
  | 'projects'
  | 'tree-cover'
  | 'net-forest-carbon-flux'
  | 'biomass-density'
  | 'net-forest-carbon-flux'
  | 'oil-carbon-density'
  | 'land-degradation';

// Sidebar and menus
export const openAtom = atom<boolean>(true);

export const dashboardAtom = atom<boolean>(false);

export const sidebarTabAtom = atom<'projects' | 'countries' | 'datasets'>('projects');

// Map viewport
export const bboxAtom = atom<readonly [number, number, number, number] | null | undefined>(null);

export const tmpBboxAtom = atom<readonly [number, number, number, number] | null>(null);

// Map layers
export const layersAtom = atom<readonly string[]>(['projects']);

export const layersInteractiveAtom = atom<string[]>([]);

export const layersInteractiveIdsAtom = atom<string[]>(['projects']);

export const layersSettingsAtom = atom<LayerSettings | EmptyObject>({});

export const popupAtom = atom<MapLayerMouseEvent | null>(null);

export const mapSettingsAtom = atom<MapSettings>({
  basemap: 'basemap-light',
  labels: 'labels-dark',
  boundaries: false,
  roads: false,
});

export const hoveredProjectAtom = atom<string | null>(null);

export const DEFAULT_SETTINGS = {
  expand: true,
};

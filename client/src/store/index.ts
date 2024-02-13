import { atom } from 'jotai';
import { MapLayerMouseEvent } from 'mapbox-gl';

type Settings = {
  opacity: number;
  visibility: boolean;
  expand: boolean;
};

type LayerSettings = Record<string, Settings>;

type EmptyObject = Record<string, never>;

type Basemap = 'basemap-light' | 'basemap-satellite';

// Sidebar and menus
export const openAtom = atom<boolean>(true);

export const dashboardAtom = atom<boolean>(false);

export const sidebarTabAtom = atom<'projects' | 'countries' | 'datasets'>('projects');

// Map viewport
export const bboxAtom = atom<readonly [number, number, number, number] | null | undefined>(null);

export const tmpBboxAtom = atom<readonly [number, number, number, number] | null>(null);

// Map layers
export const layersAtom = atom<readonly number[]>([]);

export const layersInteractiveAtom = atom<number[]>([]);

export const layersInteractiveIdsAtom = atom<string[]>([]);

export const layersSettingsAtom = atom<LayerSettings | EmptyObject>({});

export const popupAtom = atom<MapLayerMouseEvent | null>(null);

export const basemapAtom = atom<Basemap>('basemap-light');

export const DEFAULT_SETTINGS = {
  expand: true,
};

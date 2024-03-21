import { atom } from 'jotai';
import { MapLayerMouseEvent } from 'mapbox-gl';

import type { MapSettings } from '@/types/map';

// Sidebar and menus
export const openAtom = atom<boolean>(true);

export const dashboardAtom = atom<boolean>(false);

// Map viewport
export const bboxAtom = atom<readonly [number, number, number, number] | null | undefined>(null);

export const tmpBboxAtom = atom<readonly [number, number, number, number] | null>(null);

// Map layers

export const layersInteractiveAtom = atom<string[]>([]);

export const layersInteractiveIdsAtom = atom<string[]>(['projects']);

export const popupAtom = atom<MapLayerMouseEvent | null>(null);

export const mapSettingsAtom = atom<MapSettings>({
  basemap: 'basemap-light',
  labels: 'dark',
  boundaries: false,
  roads: false,
});

export const hoveredProjectAtom = atom<string | null>(null);

export const DEFAULT_SETTINGS = {
  expand: true,
};

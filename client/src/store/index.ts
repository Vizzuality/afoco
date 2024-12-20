import { atom } from 'jotai';
import { MapLayerMouseEvent } from 'mapbox-gl';

// Sidebar and menus
export const openAtom = atom<boolean>(true);

export const dashboardAtom = atom<boolean>(false);

// Map viewport
export const bboxAtom = atom<readonly [number, number, number, number] | null | undefined>(null);

export const tmpBboxAtom = atom<readonly [number, number, number, number] | null>(null);

// Map layers

export const layersInteractiveIdsAtom = atom<string[]>([]);

export const popupAtom = atom<MapLayerMouseEvent | null>(null);

// set project code when hovering a project in the map or over sidebar list
export const hoveredProjectMapAtom = atom<string[] | null>(null);

export const DEFAULT_SETTINGS = {
  expand: true,
};

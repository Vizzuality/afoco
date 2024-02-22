import { atom } from 'jotai';
import { MapLayerMouseEvent } from 'mapbox-gl';

import type { LayerSettings } from '@/types/layers';
import type { MapSettings } from '@/types/map';
import type { EmptyObject } from '@/types';

type Settings = {
  opacity: number;
  visibility: 'none' | 'visible';
};


// Map viewport
export const bboxAtom = atom<readonly [number, number, number, number] | null | undefined>(null);

export const tmpBboxAtom = atom<readonly [number, number, number, number] | null>(null);

// Map layers
export const layersAtom = atom<readonly string[]>([]);

export const layersInteractiveAtom = atom<string[]>([]);

export const layersInteractiveIdsAtom = atom<string[]>([]);

export const layersSettingsAtom = atom<LayerSettings | EmptyObject>({});

export const popupAtom = atom<MapLayerMouseEvent | null>(null);

export const mapSettingsAtom = atom<MapSettings>({
  basemap: 'basemap-light',
  labels: 'labels-dark',
  boundaries: false,
  roads: false,
});

export const DEFAULT_SETTINGS = {
  expand: true,
};

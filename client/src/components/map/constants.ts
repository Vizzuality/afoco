import type { ViewState } from 'react-map-gl';

import type { Bbox } from '@/types/map';

export const DEFAULT_VIEW_STATE: Partial<ViewState> = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

export const DEFAULT_BBOX: Bbox = [68.711178, -11.476973, 131.333249, 21.087406];

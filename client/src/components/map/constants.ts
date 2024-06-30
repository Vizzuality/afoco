import type { ViewState } from 'react-map-gl';

import type { Bbox } from '@/types/map';

export const DEFAULT_VIEW_STATE: Partial<ViewState> = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

export const DEFAULT_BBOX: Bbox = [-84.05, -46.96, 227.66, 64.23];

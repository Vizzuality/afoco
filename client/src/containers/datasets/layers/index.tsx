import type { LayerProps } from 'react-map-gl';

import type { LayerId } from '@/store';

import { ProjectsLayer } from './projects/layer';

type ComponentProps = {
  beforeId: string;
  settings: {
    opacity: number;
    visibility: boolean;
  };
  id?: string;
  onAdd?: (ids: LayerProps['id'][]) => void;
  onRemove?: (ids: LayerProps['id'][]) => void;
  zIndex?: number;
};

type LayerIndex = Readonly<{
  [key: LayerId]: ComponentProps;
}>;

export const LAYERS: LayerIndex = {
  projects: ProjectsLayer,
};

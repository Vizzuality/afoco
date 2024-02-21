import type { LayerProps } from '@/types/layers';

import { ProjectsLayer } from './projects/layer';

type LayersIndex = {
  [key: string]: React.ComponentType<LayerProps>;
};

// Define the LAYERS object with the explicit type
export const LAYERS: LayersIndex = {
  projects: ProjectsLayer,
};

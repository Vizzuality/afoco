import type { LayerProps } from '@/types/layers';

import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import ProjectsLegend from '@/containers/datasets/layers/projects/legend';

type LayersIndex = {
  [key: string]: React.ComponentType<LayerProps>;
};

type LegendIndex = {
  [key: string]: React.ComponentType;
};

// Define the LAYERS object with the explicit type
export const LAYERS: LayersIndex = {
  projects: ProjectsLayer,
  'tree-cover': ProjectsLayer,
};

export const LEGENDS: LegendIndex = {
  projects: ProjectsLegend,
  'tree-cover': ProjectsLegend,
};

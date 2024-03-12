import type { LayerProps } from '@/types/layers';

import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import ProjectsLegend from '@/containers/datasets/layers/projects/legend';
import { ProjectsGeometryLayer } from '@/containers/datasets/layers/projects-geometry/layer';

type LayersIndex = {
  [key: string]: React.ComponentType<LayerProps>;
};

type LegendIndex = {
  [key: string]: React.ComponentType;
};

// Define the LAYERS object with the explicit type
export const LAYERS: LayersIndex = {
  projects: ProjectsLayer,
  'projects-geometry': ProjectsGeometryLayer,
};

export const LEGENDS: LegendIndex = {
  projects: ProjectsLegend,
};

import type { LayerProps } from '@/types/layers';
import type { LayerSettings } from '@/types/layers';

import { LandDegradationLayer } from '@/containers/datasets/layers/land-degradation/layer';
import LandDegradationLegend from '@/containers/datasets/layers/land-degradation/legend';
import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import ProjectsLegend from '@/containers/datasets/layers/projects/legend';

type LayersIndex = {
  [key: string]: React.ComponentType<LayerProps>;
};

type LegendIndex = {
  [key: string]: React.ComponentType<{ settings: LayerSettings }>;
};

// Define the LAYERS object with the explicit type
export const LAYERS: LayersIndex = {
  projects: ProjectsLayer,
  'land-degradation': LandDegradationLayer,
};

export const LEGENDS: LegendIndex = {
  projects: ProjectsLegend,
  'land-degradation': LandDegradationLegend,
};

import type { LayerProps, DeckGLLayerProps, LayerSettings, LayerId } from '@/types/layers';

import { LandDegradationLayer } from '@/containers/datasets/layers/land-degradation/layer';
import LandDegradationLegend from '@/containers/datasets/layers/land-degradation/legend';
import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import ProjectsLegend from '@/containers/datasets/layers/projects/legend';
import TreeCoverLayer from '@/containers/datasets/layers/tree-cover/layer';
import TreeCoverLegend from '@/containers/datasets/layers/tree-cover/legend';

// Separate the layers into two distinct types based on their prop requirements
type DeckGLLayerIndex<T> = {
  [K in LayerId]?: React.ComponentType<DeckGLLayerProps<T>>;
};

type SimpleLayerIndex = {
  [key: string]: React.ComponentType<LayerProps>;
};

type LegendIndex = {
  [key: string]: React.ComponentType<{ settings: LayerSettings }>;
};

// layers that require DeckGLLayerProps
const DECKGL_LAYERS: DeckGLLayerIndex<LayerId> = {
  'tree-cover': TreeCoverLayer,
};

// layers that require simple LayerProps
const SIMPLE_LAYERS: SimpleLayerIndex = {
  projects: ProjectsLayer,
  'land-degradation': LandDegradationLayer,
};

export const LEGENDS: LegendIndex = {
  projects: ProjectsLegend,
  'land-degradation': LandDegradationLegend,
  'tree-cover': TreeCoverLegend,
};

// Utility function to combine both layer types into a single object for export
function combineLayers<T>(
  deckglLayers: DeckGLLayerIndex<T>,
  simpleLayers: SimpleLayerIndex
): { [key: string]: React.ComponentType<any> } {
  return { ...deckglLayers, ...simpleLayers };
}

// Combine both DECKGL_LAYERS and SIMPLE_LAYERS into LAYERS for export
export const LAYERS = combineLayers(DECKGL_LAYERS, SIMPLE_LAYERS);

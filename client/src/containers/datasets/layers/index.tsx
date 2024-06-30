import type { LayerProps, DeckGLLayerProps } from '@/types/layers';

import BiomassDensity from '@/containers/datasets/layers/biomass-density/layer';
import { LandDegradationLayer } from '@/containers/datasets/layers/land-degradation/layer';
import NetForestCarbonFluxLayer from '@/containers/datasets/layers/net-forest-carbon-flux/layer';
import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import SoilCarbonDensityLayer from '@/containers/datasets/layers/soil-carbon-density/layer';
import TreeCoverLayer from '@/containers/datasets/layers/tree-cover/layer';
import TreeCoverLossLayer from '@/containers/datasets/layers/tree-cover-loss/layer';

type DeckGLLayerIndex<T> = {
  [key: number]: React.ComponentType<DeckGLLayerProps<T>>;
};

type SimpleLayerIndex = {
  [key: number]: React.ComponentType<LayerProps>;
};

// layers that require DeckGLLayerProps
const DECKGL_LAYERS: DeckGLLayerIndex<number> = {
  1: TreeCoverLayer as React.ComponentType<DeckGLLayerProps<number>>,
  3: NetForestCarbonFluxLayer as React.ComponentType<DeckGLLayerProps<number>>,
  2: BiomassDensity as React.ComponentType<DeckGLLayerProps<number>>,
  7: TreeCoverLossLayer as React.ComponentType<DeckGLLayerProps<number>>,
};

const SIMPLE_LAYERS: SimpleLayerIndex = {
  5: ProjectsLayer,
  4: SoilCarbonDensityLayer,
  6: LandDegradationLayer,
};

function combineLayers<T>(
  deckglLayers: DeckGLLayerIndex<T>,
  simpleLayers: SimpleLayerIndex
): { [key: number]: React.ComponentType<any> } {
  return { ...deckglLayers, ...simpleLayers } as { [key: number]: React.ComponentType<any> };
}

export const LAYERS = combineLayers(DECKGL_LAYERS, SIMPLE_LAYERS);

import type { LayerProps, DeckGLLayerProps, LayerSettings, LayerId } from '@/types/layers';

import BiomassDensity from '@/containers/datasets/layers/biomass-density/layer';
import { LandDegradationLayer } from '@/containers/datasets/layers/land-degradation/layer';
import LandDegradationLegend from '@/containers/datasets/layers/land-degradation/legend';
import NetForestCarbonFluxLayer from '@/containers/datasets/layers/net-forest-carbon-flux/layer';
import { ProjectsLayer } from '@/containers/datasets/layers/projects/layer';
import ProjectsLegend from '@/containers/datasets/layers/projects/legend';
import TreeCoverLayer from '@/containers/datasets/layers/tree-cover/layer';

import SoilCarbonDensity from './soil-carbon-density/layer';

type DeckGLLayerIndex<T> = {
  [K in LayerId]?: React.ComponentType<DeckGLLayerProps<T>>;
};

type SimpleLayerIndex = {
  [K in LayerId]?: React.ComponentType<LayerProps>;
};

type LegendIndex = {
  [key: string]: React.ComponentType<{ settings: LayerSettings }>;
};

// layers that require DeckGLLayerProps
const DECKGL_LAYERS: DeckGLLayerIndex<LayerId> = {
  'tree-cover': TreeCoverLayer as React.ComponentType<DeckGLLayerProps<LayerId>>,
  'net-forest-carbon-flux': NetForestCarbonFluxLayer as React.ComponentType<
    DeckGLLayerProps<LayerId>
  >,
  'biomass-density': BiomassDensity as React.ComponentType<DeckGLLayerProps<LayerId>>,
  'soil-carbon-density': SoilCarbonDensity as React.ComponentType<DeckGLLayerProps<LayerId>>,
};

const SIMPLE_LAYERS: SimpleLayerIndex = {
  projects: ProjectsLayer,
  'land-degradation': LandDegradationLayer,
};

export const LEGENDS: LegendIndex = {
  projects: ProjectsLegend,
  'tree-cover': ProjectsLegend,
  'land-degradation': LandDegradationLegend,
};

function combineLayers<T>(
  deckglLayers: DeckGLLayerIndex<T>,
  simpleLayers: SimpleLayerIndex
): { [key in LayerId]: React.ComponentType<any> } {
  return { ...deckglLayers, ...simpleLayers } as { [key in LayerId]: React.ComponentType<any> };
}

export const LAYERS = combineLayers(DECKGL_LAYERS, SIMPLE_LAYERS);

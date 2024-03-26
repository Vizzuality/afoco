import { Layer as DeckLayer } from '@deck.gl/core/typed';
import type { AnyLayer, AnySourceData } from 'mapbox-gl';

export type Config = {
  source: AnySourceData;
  styles: AnyLayer[];
};

export type ParamsConfigValue = {
  key: string;
  default: unknown;
};

export type LayerId =
  | 'projects'
  | 'tree-cover'
  | 'net-forest-carbon-flux'
  | 'biomass-density'
  | 'net-forest-carbon-flux'
  | 'soil-carbon-density'
  | 'land-degradation';

export interface LayerSettings {
  opacity: number;
  visibility: 'none' | 'visible';
  id: number;
}

export type ParamsConfig = Record<string, ParamsConfigValue>[];

export type LegendConfig = {
  type: 'basic' | 'gradient' | 'choropleth';
  items: {
    value: string;
    color: string;
  }[];
};

export type InteractionConfig = {
  enabled: boolean;
  events: {
    type: 'click' | 'hover';
    values: {
      key: string;
      label: string;
      format?: unknown;
    }[];
  }[];
};

export type LayerProps = {
  id: number;
  zIndex?: number;
  onAdd?: () => void;
  onRemove?: (ids: string[]) => void;
  beforeId: string;
  settings?: { opacity: LayerSettings['opacity']; visibility: LayerSettings['visibility'] };
};

export type LayerTyped = {
  config: Config;
  params_config: ParamsConfig;
  legend_config: LegendConfig;
  interaction_config: InteractionConfig;
};

export type DeckGLLayerProps<T> = LayerProps &
  Partial<T> & {
    beforeId: string;
    config: DeckLayer<{ beforeId: string }>;
  };

export type LegendType = {
  type: 'basic' | 'gradient' | 'choropleth';
  items: {
    name?: string;
    value: string;
    color: string;
  }[];
};

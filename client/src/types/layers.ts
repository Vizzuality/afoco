import type { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FormatProps } from '@/lib/utils/formats';

import type { Layer } from '@/types/generated/strapi.schemas';

export type Config = {
  source: AnySourceData;
  styles: AnyLayer[];
};

export type ParamsConfigValue = {
  key: string;
  default: unknown;
};

export interface LayerSettings {
  opacity: number;
  visibility: 'none' | 'visible';
  [key: string]: unknown;
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
      format?: FormatProps;
    }[];
  }[];
};

export type LayerProps = {
  id?: string;
  zIndex?: number;
  onAdd?: () => void;
  onRemove?: (ids: string[]) => void;
  beforeId: string;
  settings: LayerSettings;
};

export type LayerTyped = Layer & {
  config: Config;
  params_config: ParamsConfig;
  legend_config: LegendConfig;
  interaction_config: InteractionConfig;
};

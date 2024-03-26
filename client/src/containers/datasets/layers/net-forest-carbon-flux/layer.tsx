'use client';

import { Layer } from 'deck.gl/typed';

import { parseConfig, JSON_CONFIGURATION } from '@/lib/json-converter';

import { useGetLayersId } from '@/types/generated/layer';
import type { LayerProps, LayerSettings } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import DeckJsonLayer from '@/components/map/layers/deck-layer';

const NetForestCarbonFluxLayer = ({
  id,
  beforeId,
  settings = { opacity: 1, visibility: 'visible' },
}: {
  id: number;
  beforeId: string;
  settings: LayerProps['settings'];
}) => {
  const { data } = useGetLayersId(Number(id));
  const [layers] = useSyncLayers();
  const layerSettings = layers.find((l: LayerSettings) => l.id === id);

  const { opacity, visibility } = layerSettings || settings;
  if (!data?.data?.attributes) return null;

  const { config, params_config } = data.data.attributes;

  const c = parseConfig<Layer>({
    config,
    params_config,
    settings: { opacity, visibility },
    jsonConfiguration: JSON_CONFIGURATION,
  } as any);
  return <DeckJsonLayer id={id} beforeId={beforeId} config={c} />;
};

export default NetForestCarbonFluxLayer;

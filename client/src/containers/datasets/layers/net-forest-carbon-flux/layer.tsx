'use client';

import { Layer } from 'deck.gl/typed';

import { parseConfig, JSON_CONFIGURATION } from '@/lib/json-converter';

// import { useGetLayersId } from '@/types/generated/layer';

import type { LayerId, LayerProps, LayerSettings } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import DeckJsonLayer from '@/components/map/layers/deck-layer';

import fakeConfig from './mock.json';

const NetForestCarbonFluxLayer = ({
  id,
  beforeId,
  settings = { opacity: 1, visibility: 'visible' },
}: {
  id: LayerId;
  beforeId: string;
  settings: LayerProps['settings'];
}) => {
  // TODO: change strapi schema id to string
  // const { data } = useGetLayersId(Number(id));
  const [layers] = useSyncLayers();
  const layerSettings = layers.find((l: LayerSettings) => l.id === id);

  const { opacity, visibility } = layerSettings || settings;
  // if (!data?.data?.attributes) return null;
  const config = fakeConfig;
  const params_config = [
    {
      key: 'opacity',
      default: 1,
    },
    {
      key: 'visibility',
      default: true,
    },
  ];

  const c = parseConfig<Layer>({
    config,
    params_config,
    settings: { opacity, visibility },
    jsonConfiguration: JSON_CONFIGURATION,
  } as any);
  return <DeckJsonLayer id="net-forest-carbon-flux" beforeId={beforeId} config={c} />;
};

export default NetForestCarbonFluxLayer;

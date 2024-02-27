'use client';

import { parseConfig } from '@/lib/json-converter';

import { useGetLayersId } from '@/types/generated/layer';
import { LayerTyped } from '@/types/layers';
import type { LayerSettings } from '@/types/layers';

import DeckJsonLayer from '@/components/map/layers/deck-json-layer';

interface LayerManagerItemProps {
  id: string;
  beforeId: string;
  settings: LayerSettings;
}

const LayerManagerItem = ({ id, beforeId, settings }: LayerManagerItemProps) => {
  // TODO: change strapi schema id to string
  const { data } = useGetLayersId(Number(id));

  if (!data?.data?.attributes) return null;

  const { type } = data.data.attributes as LayerTyped;

  if (type === 'deckgl') {
    const { config, params_config } = data.data.attributes;
    const c = parseConfig({
      // TODO: type
      config,
      params_config,
      settings,
    });

    return <DeckJsonLayer id={`${id}-layer`} beforeId={beforeId} config={c} settings={settings} />;
  }
};

export default LayerManagerItem;

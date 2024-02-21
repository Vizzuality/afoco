'use client';

import { useCallback } from 'react';

import { useSetAtom, useAtom } from 'jotai';

import { parseConfig } from '@/lib/json-converter';

import { layersInteractiveAtom, layersInteractiveIdsAtom } from '@/store';

import { useGetLayersId } from '@/types/generated/layer';
import { Config, LayerTyped } from '@/types/layers';
import type { LayerSettings } from '@/types/layers';

import DeckJsonLayer from '@/components/map/layers/deck-json-layer';
import MapboxLayer from '@/components/map/layers/mapbox-layer';

interface LayerManagerItemProps {
  id: string;
  beforeId: string;
  settings: LayerSettings;
}

const LayerManagerItem = ({ id, beforeId, settings }: LayerManagerItemProps) => {
  // TODO: change strapi schema id to string
  const { data } = useGetLayersId(Number(id));

  const setLayersInteractiveIds = useSetAtom(layersInteractiveIdsAtom);

  const [layersInteractive, setLayersInteractive] = useAtom(layersInteractiveAtom);

  const handleAddMapboxLayer = useCallback(
    ({ styles }: Config) => {
      if (!data?.data?.attributes) return null;

      const { interaction_config } = data.data.attributes as LayerTyped;

      if (interaction_config?.enabled) {
        const ids = styles.map((l) => l.id);
        if (layersInteractive.includes(id)) {
          return;
        }
        setLayersInteractive((prev) => [...prev, id]);
        setLayersInteractiveIds((prev) => [...prev, ...ids]);
      }
    },
    [data?.data?.attributes, id, layersInteractive, setLayersInteractive, setLayersInteractiveIds]
  );

  const handleRemoveMapboxLayer = useCallback(
    ({ styles }: Config) => {
      if (!data?.data?.attributes) return null;

      const { interaction_config } = data.data.attributes as LayerTyped;

      if (interaction_config?.enabled) {
        const ids = styles.map((l) => l.id);

        setLayersInteractive((prev) => prev.filter((i) => i !== id));
        setLayersInteractiveIds((prev) => prev.filter((i) => !ids.includes(i)));
      }
    },
    [data?.data?.attributes, id, setLayersInteractive, setLayersInteractiveIds]
  );

  if (!data?.data?.attributes) return null;

  const { type } = data.data.attributes as LayerTyped;

  if (type === 'mapbox') {
    const { config, params_config } = data.data.attributes;

    const c = parseConfig<Config>({
      config,
      params_config,
      settings,
    });

    if (!c) return null;

    return (
      <MapboxLayer
        id={`${id}-layer`}
        beforeId={beforeId}
        config={c}
        onAdd={handleAddMapboxLayer}
        onRemove={handleRemoveMapboxLayer}
        settings={settings}
      />
    );
  }

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

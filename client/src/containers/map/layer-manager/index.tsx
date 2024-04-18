import { useCallback } from 'react';

import { Layer } from 'react-map-gl';

import { useSetAtom } from 'jotai';

import { layersInteractiveIdsAtom } from '@/store';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { LAYERS } from '@/containers/datasets/layers';
import { PointsOfInterestLayer } from '@/containers/datasets/layers/points-of-interest/layer';

import { DeckMapboxOverlayProvider } from '@/components/map/provider';

const LayerManager = () => {
  const [layers] = useSyncLayers();

  const layersIds = layers.map((l) => l.id);

  const setInteractiveLayerIds = useSetAtom(layersInteractiveIdsAtom);

  const handleAdd = useCallback(
    (styleIds: string[]) => {
      setInteractiveLayerIds((prevInteractiveIds) => [...prevInteractiveIds, ...styleIds]);
    },
    [setInteractiveLayerIds]
  );

  const handleRemove = useCallback(
    (styleIds: string[]) => {
      setInteractiveLayerIds((prevInteractiveIds) => [
        ...prevInteractiveIds.filter((id) => !styleIds.includes(id)),
      ]);
    },
    [setInteractiveLayerIds]
  );

  return (
    <DeckMapboxOverlayProvider>
      <>
        {/*
          Generate all transparent backgrounds to be able to sort by layers without an error
          - https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
        */}

        {layersIds.map((l, i) => {
          const beforeId = i === 0 ? 'custom-layers' : `${layersIds[i - 1]}-layer`;
          return (
            <Layer
              id={`${l}-layer`}
              key={l}
              type="background"
              layout={{ visibility: 'none' }}
              beforeId={beforeId}
            />
          );
        })}

        {/*
          Loop through active layers. The id is gonna be used to fetch the current layer and know how to order the layers.
          The first item will always be at the top of the layers stack
        */}

        {layersIds.map((l, i) => {
          const LayerComponent = LAYERS[l];
          const beforeId =
            l === 5
              ? 'continent-label-dark'
              : i === 0
              ? 'custom-layers'
              : `${layersIds[i - 1]}-layer`;

          return (
            <LayerComponent
              id={l}
              key={l}
              beforeId={beforeId}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          );
        })}
        <PointsOfInterestLayer id={0} beforeId="custom-layers" />
      </>
    </DeckMapboxOverlayProvider>
  );
};

export default LayerManager;

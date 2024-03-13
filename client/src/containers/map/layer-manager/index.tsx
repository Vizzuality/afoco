import { Layer } from 'react-map-gl';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { LAYERS } from '@/containers/datasets/layers';

import { DeckMapboxOverlayProvider } from '@/components/map/provider';

const LayerManager = () => {
  const [layers] = useSyncLayers();

  return (
    <DeckMapboxOverlayProvider>
      <>
        {/*
          Generate all transparent backgrounds to be able to sort by layers without an error
          - https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
        */}
        {layers.map((l, i) => {
          const beforeId = i === 0 ? 'custom-layers' : `${layers[i - 1]}-layer`;
          return (
            <Layer
              id={`${l.id}-layer`}
              key={l.id}
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
        {layers.map((l, i) => {
          const LayerComponent = LAYERS[l.id];

          const beforeId = i === 0 ? 'custom-layers' : `${layers[i - 1]}-layer`;
          const settings = { opacity: l.opacity, visibility: l.visibility };

          return <LayerComponent id={l.id} key={l.id} beforeId={beforeId} settings={settings} />;
        })}
      </>
    </DeckMapboxOverlayProvider>
  );
};

export default LayerManager;

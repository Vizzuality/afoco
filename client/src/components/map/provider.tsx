import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from 'react';

import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';

interface DeckMapboxOverlayContext {
  addLayer: (layer: any) => void;
  removeLayer: (id: string) => void;
}

const Context = createContext<DeckMapboxOverlayContext | null>(null);

function useMapboxOverlay(props: MapboxOverlayProps) {
  const overlayRef = useRef<MapboxOverlay | null>(null);

  useEffect(() => {
    if (!overlayRef.current) {
      overlayRef.current = new MapboxOverlay(props);
    } else {
      overlayRef.current.setProps(props);
    }
  }, [props]);

  return overlayRef.current;
}

export const DeckMapboxOverlayProvider: React.FC<PropsWithChildren<NonNullable<unknown>>> = ({
  children,
}) => {
  const layersRef = useRef<any[]>([]);

  const OVERLAY = useMapboxOverlay({
    layers: layersRef.current,
  });

  const addLayer = useCallback(
    (layer: any) => {
      const newLayers = layersRef.current.filter((l) => l.id !== layer.id).concat(layer);
      layersRef.current = newLayers;
      OVERLAY?.setProps({ layers: newLayers });
    },
    [OVERLAY]
  );

  const removeLayer = useCallback(
    (id: string) => {
      const newLayers = layersRef.current.filter((l) => l.id !== id);
      layersRef.current = newLayers;
      OVERLAY?.setProps({ layers: newLayers });
    },
    [OVERLAY]
  );

  const context = useMemo(
    () => ({
      addLayer,
      removeLayer,
    }),
    [addLayer, removeLayer]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useDeckMapboxOverlayContext = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('useDeckMapboxOverlayContext must be used within a DeckMapboxOverlayProvider');
  }

  return context;
};

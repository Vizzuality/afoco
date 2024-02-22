import { useCallback } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { cn } from '@/lib/classnames';

import { layersSettingsAtom, layersAtom } from '@/store';

import Legend from '@/components/map/legend';

import MapLegendItem from './item';

const MapLegends = ({ className = '' }) => {
  const [layers, setLayers] = useAtom(layersAtom);
  const layersSettings = useAtomValue(layersSettingsAtom);

  const handleChangeOrder = useCallback(
    (order: string[]) => {
      const newLayers: string[] = order.reduce((prev: string[], curr) => {
        const id = layers.find((layer) => layer === curr);
        return !!id ? [...prev, id] : prev;
      }, []);

      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  const sortable = layers?.length > 1;

  return (
    <div className="absolute bottom-16 right-6 z-10 w-full max-w-xs">
      <Legend
        className={cn(
          'max-h-[calc(100vh_-_theme(space.16)_-_theme(space.6)_-_theme(space.48))]',
          className
        )}
        sortable={{
          enabled: sortable,
          handle: true,
        }}
        onChangeOrder={handleChangeOrder}
      >
        {layers.map((layer) => {
          const settings = layersSettings[layer] ?? { opacity: 1, visibility: 'visible' };
          return <MapLegendItem key={layer} id={layer} settings={settings} />;
        })}
      </Legend>
    </div>
  );
};

export default MapLegends;

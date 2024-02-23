import { useCallback, useState } from 'react';

import { useAtom, useAtomValue } from 'jotai';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { layersSettingsAtom, layersAtom } from '@/store';

import Legend from '@/components/map/legend';
import { Button } from '@/components/ui/button';

import MapLegendItem from './item';

const MapLegends = ({ className = '' }) => {
  const [layers, setLayers] = useAtom(layersAtom);
  const layersSettings = useAtomValue(layersSettingsAtom);

  const [openLegend, setOpenLegend] = useState(true);
  const handleOpenLegend = useCallback(() => setOpenLegend((prev) => !prev), []);

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
    <div className="absolute bottom-6 right-6 z-10 flex w-full max-w-[285px] space-x-2">
      {openLegend && (
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
      )}
      <Button
        variant="primary"
        size="base"
        className="ml-auto mt-auto h-8 w-8 rounded-full p-0"
        onClick={handleOpenLegend}
      >
        {openLegend ? <ChevronsRight size={12} /> : <ChevronsLeft size={12} />}
      </Button>
    </div>
  );
};

export default MapLegends;

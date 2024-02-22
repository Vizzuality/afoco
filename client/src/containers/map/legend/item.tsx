'use-client';

import { useCallback } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Eye, PaintBucket, XCircle } from 'lucide-react';

import { layersSettingsAtom, DEFAULT_SETTINGS, layersAtom } from '@/store';

import { LegendItemProps } from '@/components/map/legend/types';

type MapLegendItemProps = LegendItemProps;

const MapLegendItem = ({ id, settings }: MapLegendItemProps) => {
  const setLayersSettings = useSetAtom(layersSettingsAtom);
  const [layers, setLayers] = useAtom(layersAtom);

  const handleChangeOpacity = useCallback(
    (opacity: number) =>
      setLayersSettings((prev) => ({
        ...prev,
        [id]: {
          ...DEFAULT_SETTINGS,
          ...prev[id],
          opacity,
        },
      })),
    [id, setLayersSettings]
  );

  const handleChangeVisibility = useCallback(
    () =>
      setLayersSettings((prev) => ({
        ...prev,
        [id]: {
          ...DEFAULT_SETTINGS,
          ...prev[id],
          visibility: settings?.visibility === 'visible' ? 'none' : 'visible',
        },
      })),
    [id, settings, setLayersSettings]
  );

  const handleRemoveLayer = () => {
    if (!id) return;

    if (layers.includes(id)) {
      return setLayers(layers.filter((l) => l !== id));
    }
  };

  return (
    <div
      key={id}
      className="shadow-legend flex w-full items-center justify-between rounded bg-white px-4 py-2"
      id={id}
    >
      <p className="text-xs capitalize">{id}</p>
      <div className="flex space-x-3">
        <button onClick={() => handleChangeOpacity(0.7)}>
          <PaintBucket size={12} />
        </button>
        <button onClick={handleChangeVisibility}>
          <Eye size={12} />
        </button>
        <button onClick={handleRemoveLayer}>
          <XCircle size={12} />
        </button>
      </div>
    </div>
  );
};

export default MapLegendItem;

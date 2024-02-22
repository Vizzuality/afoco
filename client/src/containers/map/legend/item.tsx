'use-client';

import { useCallback } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Eye, EyeOff, PaintBucket, XCircle } from 'lucide-react';

import { layersSettingsAtom, DEFAULT_SETTINGS, layersAtom } from '@/store';

import { LEGENDS } from '@/containers/datasets/layers';

import { LegendItemProps } from '@/components/map/legend/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const LegendDetailComponent = LEGENDS[id];

  return (
    <div
      key={id}
      className="shadow-legend flex w-full items-center justify-between rounded bg-white px-4 py-2"
      id={id}
    >
      <div className="flex items-center space-x-2">
        <LegendDetailComponent />
        <p className="text-xs capitalize">{id}</p>
      </div>
      <div className="flex space-x-px">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleChangeOpacity(0.7)}
              className="rounded-full p-1.5 hover:bg-yellow-100"
            >
              <PaintBucket size={12} />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={0}>Opacity</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleChangeVisibility}
              className="rounded-full p-1.5 hover:bg-yellow-100"
            >
              {settings?.visibility === 'visible' ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={0}>
            {settings?.visibility === 'visible' ? 'Hide Layer' : 'Show Layer'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleRemoveLayer} className="rounded-full p-1.5 hover:bg-yellow-100">
              <XCircle size={12} />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={0}>Remove Layer</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default MapLegendItem;

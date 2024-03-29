'use-client';

import { useCallback } from 'react';

import { Eye, EyeOff, PaintBucket, XCircle } from 'lucide-react';

import { LayerSettings } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const LegendSettings = ({ settings }: { settings: LayerSettings }) => {
  const [layers, setLayersToURL] = useSyncLayers();
  const { id } = settings;
  const handleChangeOpacity = useCallback(
    (opacity: number) => {
      const layerToUpdate = layers.map((ly) => {
        if (ly.id === id) {
          return { ...ly, opacity };
        }
        return ly;
      });
      setLayersToURL(layerToUpdate);
    },
    [id, layers, setLayersToURL]
  );

  const handleChangeVisibility = useCallback(() => {
    const layerToUpdate = layers.map((ly) => {
      if (ly.id === id) {
        return { ...ly, visibility: settings?.visibility === 'visible' ? 'none' : 'visible' };
      }
      return ly;
    }) as LayerSettings[];
    setLayersToURL(layerToUpdate);
  }, [id, settings, layers, setLayersToURL]);

  const handleRemoveLayer = () => {
    if (!id) return;
    if (layers.some((l) => l.id === id)) {
      const newLayers = layers.filter((l) => l.id !== id);
      setLayersToURL(newLayers);
    }
  };

  return (
    <div className="flex space-x-px">
      <Popover>
        <PopoverTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="rounded-full p-1.5 hover:bg-yellow-100">
                <PaintBucket size={12} />
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={0} className="font-light">
              Opacity
            </TooltipContent>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent sideOffset={2} side="top" align="end" className="w-56 rounded bg-white">
          <Slider
            max={1}
            step={0.1}
            defaultValue={[settings?.opacity || 1]}
            onValueChange={(op: number[]) => handleChangeOpacity(op[0])}
          />
        </PopoverContent>
      </Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleChangeVisibility}
            className="rounded-full p-1.5 hover:bg-yellow-100"
          >
            {settings?.visibility === 'visible' ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={0} className="font-light">
          {settings?.visibility === 'visible' ? 'Hide Layer' : 'Show Layer'}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={handleRemoveLayer} className="rounded-full p-1.5 hover:bg-yellow-100">
            <XCircle size={12} />
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={0} className="font-light">
          Remove Layer
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LegendSettings;

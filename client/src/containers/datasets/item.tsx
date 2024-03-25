'use client';

import { useCallback } from 'react';

import { Info } from 'lucide-react';

import type { LayerListResponse } from '@/types/generated/layer';
import { LayerId } from '@/types/layers';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

// TODO: replace with real type DatasetItemResonseDataItem
export default function DatasetsItem(props: LayerListResponse) {
  const [layers, setLayersToURL] = useSyncLayers();

  const handleLayerChange = useCallback(() => {
    if (!layers.some((l) => l.id === props.id)) {
      setLayersToURL([...layers, { id: props.id as LayerId, opacity: 1, visibility: 'visible' }]);
    }
    if (layers.some((l) => l.id === props.id)) {
      const newLayers = layers.filter((l) => l.id !== props.id);
      setLayersToURL(newLayers);
    }
  }, [layers, setLayersToURL, props.id]);

  return (
    <div className="flex flex-col space-y-1.5 border-b py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={layers.some((l) => l.id === props.id)}
            onCheckedChange={handleLayerChange}
          />
          {/* <h3 className="text-sm">{props.attributes.title}</h3> */}
          <h3 className="text-sm">{props.attributes.name}</h3>
        </div>
        <Dialog>
          <DialogTrigger
            className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50"
            data-cy={`info-${props.attributes.name}-button`}
          >
            <Info className="h-4 w-4 text-black" strokeWidth={1} />
          </DialogTrigger>

          <DialogContent className="p-0" data-cy={`info-${props.attributes.name}-dialog`}>
            <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
              {/* {props.attributes.title} */}
              {props.attributes.name}
            </h3>
            <div className="border-b border-t border-gray-100 py-2.5">
              <p className="px-6 text-sm text-yellow-900">{props.attributes.info}</p>
            </div>
            <div className="flex w-full px-6 pb-4">
              <DialogClose asChild>
                <Button
                  data-cy={`info-${props.attributes.name}-dialog-close`}
                  variant="primary"
                  size="base"
                  className="ml-auto w-12 self-end"
                >
                  Ok
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <p className="ml-10 mr-5 text-xs leading-4 text-gray-500">{props.attributes.description}</p>
      </div>
    </div>
  );
}

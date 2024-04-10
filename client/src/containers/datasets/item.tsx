'use client';

import { useCallback } from 'react';

import Markdown from 'react-markdown';

import { Info as InfoIcon } from 'lucide-react';
import remarkGfm from 'remark-gfm';

import type { LayerListResponseDataItem } from '@/types/generated/strapi.schemas';

import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

export default function DatasetsItem(props: LayerListResponseDataItem) {
  const [layers, setLayersToURL] = useSyncLayers();

  const handleLayerChange = useCallback(() => {
    if (!layers.some((l) => l.id === props.id)) {
      setLayersToURL([...layers, { id: props.id, opacity: 1, visibility: 'visible' }]);
    }
    if (layers.some((l) => l.id === props.id)) {
      const newLayers = layers.filter((l) => l.id !== props.id);
      setLayersToURL(newLayers);
    }
  }, [layers, setLayersToURL, props.id]);

  if (!props.attributes) return null;

  return (
    <div className="flex flex-col space-y-1.5 border-b py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={layers.some((l) => l.id === props.id)}
            onCheckedChange={handleLayerChange}
          />
          <h3 className="text-sm">{props.attributes.name}</h3>
        </div>
        {props.attributes.dialog && (
          <Dialog>
            <DialogTrigger
              className="flex items-center justify-center rounded-full p-2 hover:bg-yellow-50 data-[state=open]:bg-yellow-50"
              data-cy={`info-${props.attributes.slug}-button`}
            >
              <InfoIcon className="h-4 w-4 text-black" strokeWidth={1} />
            </DialogTrigger>

            <DialogContent className="p-0" data-cy={`info-${props.attributes.slug}-dialog`}>
              <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
                {/* {props.attributes.title} */}
                {props.attributes.name}
              </h3>
              <div className="border-b border-t border-gray-100">
                {props.attributes.dialog && (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="prose info-dialog px-6 py-4 text-xs"
                  >
                    {props.attributes.dialog}
                  </Markdown>
                )}
              </div>
              <div className="flex w-full px-6 pb-4">
                <DialogClose asChild>
                  <Button
                    data-cy={`info-${props.attributes.slug}-dialog-close`}
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
        )}
      </div>
      <div>
        <p className="whitespace ml-10 mr-5 flex-nowrap break-words text-xs leading-4 text-gray-500">
          <Markdown>{props.attributes.description}</Markdown>
        </p>
      </div>
    </div>
  );
}

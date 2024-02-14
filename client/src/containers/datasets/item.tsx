'use client';

import { useState } from 'react';

import { Info } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { DatasetListResponseDataItem } from '@/types/generated/strapi.schemas';

// import Layers from '@/containers/datasets/layers';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

export default function DatasetsItem(props: Required<DatasetListResponseDataItem>) {
  const [infoOpen, setInfoOpen] = useState(false);

  const mockedLayersSelected = ['projects', 'tree-cover', 'soil-carbon-density'];

  return (
    <div className="flex flex-col space-y-1.5 border-b py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={mockedLayersSelected.includes(props.id)}
            onCheckedChange={() => console.info(`set layer ${props.id}`)}
          />
          <h3 className="text-sm">{props.attributes.title}</h3>
        </div>
        <Dialog>
          <DialogTrigger
            className={cn({
              'flex items-center justify-center rounded-full p-2 hover:bg-yellow-50': true,
              'bg-yellow-50': infoOpen,
            })}
            onClick={() => setInfoOpen(true)}
          >
            <Info className="h-4 w-4 text-black" strokeWidth={1} />
          </DialogTrigger>

          {infoOpen && (
            <DialogContent className="p-0">
              <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
                {props.attributes.title}
              </h3>
              <div className="border-b border-t border-gray-100 py-2.5">
                <p className="px-6 text-sm text-yellow-900">
                  Lorem ipsum dolor sit amet consectetur. Ac in vel mauris lectus in. Cras tellus
                  aliquam amet quisque. Amet ut mi sed purus. Nulla adipiscing commodo lectus sed
                  vehicula. Convallis etiam placerat imperdiet nunc tempus sit. Mi non habitant
                  blandit cursus ullamcorper vitae. Aliquet donec egestas vitae tincidunt nunc amet
                  ultricies. Cras blandit mattis etiam erat. Iaculis tellus euismod enim integer.
                  Lorem ipsum dolor sit amet consectetur. Ac in vel mauris lectus in. Cras tellus
                  aliquam amet quisque. Amet ut mi sed purus. Nulla adipiscing commodo lectus sed
                  vehicula. Convallis etiam placerat imperdiet nunc tempus sit. Mi non habitant
                  blandit cursus ullamcorper vitae. Aliquet donec egestas vitae tincidunt nunc amet
                  ultricies. Cras blandit mattis etiam erat. Iaculis tellus euismod enim integer.
                </p>
              </div>
              <div className="flex w-full px-6 pb-4">
                <Button
                  variant="primary"
                  size="base"
                  className="ml-auto w-12"
                  onClick={() => setInfoOpen(false)}
                >
                  Ok
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div>
        <p className="ml-10 mr-5 text-xs leading-4 text-gray-500">{props.attributes.description}</p>
      </div>

      {/* <Layers datasetId={props.id} /> */}
    </div>
  );
}

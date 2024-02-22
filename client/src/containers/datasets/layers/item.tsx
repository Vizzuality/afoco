'use client';

import { useAtom } from 'jotai';

import { layersAtom } from '@/store';

import { LayerListResponseDataItem } from '@/types/generated/strapi.schemas';

import { Switch } from '@/components/ui/switch';

export default function LayersItem({ id, attributes }: Required<LayerListResponseDataItem>) {
  const [layers, setLayers] = useAtom(layersAtom);

  const handleLayerChange = () => {
    if (!id) return;

    if (layers.includes(id)) {
      return setLayers(layers.filter((l) => l !== id));
    }

    if (!layers.includes(id)) {
      return setLayers([id, ...layers]);
    }
  };

  return (
    <li key={id} className="space-y-2.5">
      <header className="flex justify-between space-x-2.5 py-1 pl-2">
        <h4>{attributes.title}</h4>

        <Switch checked={layers.includes(id)} onCheckedChange={handleLayerChange} />
      </header>
    </li>
  );
}

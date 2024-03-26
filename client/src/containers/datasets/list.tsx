'use client';

import { orderBy } from 'lodash-es';

import { useGetLayers } from '@/types/generated/layer';

import DatasetsItem from './item';

export default function DatasetsList() {
  const { data } = useGetLayers({
    populate: '*',
  });

  const layers = data?.data || [];

  return (
    <>
      <h3 className="text-xs text-gray-500">Activate data layers on the map</h3>
      <div className="flex flex-col">
        {layers
          .sort((a, b) => {
            if (a?.attributes?.slug === 'projects') return -1;
            if (b?.attributes?.slug === 'projects') return 1;
            return 0;
          })
          .map((l) => {
            if (!l.id || !l.attributes) return null;
            return <DatasetsItem key={l.id} {...l} />;
          })}
      </div>
    </>
  );
}

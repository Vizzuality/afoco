'use client';

import { useGetLayers } from '@/types/generated/layer';

import ContentLoader from '@/components/ui/loader';

import DatasetsItem from './item';

export default function DatasetsList() {
  const { data, isFetching, isFetched, isError } = useGetLayers({
    populate: '*',
  });

  const layers = data?.data || [];
  console.log(layers, 'layers');
  return (
    <ContentLoader
      data={data}
      isPlaceholderData={false}
      isFetching={isFetching}
      isFetched={isFetched}
      isError={isError}
      loaderClassName="mt-40"
    >
      <h3 className="text-xs text-gray-500">Activate data layers on the map</h3>
      <div className="mt-2 flex flex-col">
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
    </ContentLoader>
  );
}

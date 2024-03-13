'use client';

// import { useDatasetsGroups } from '@/hooks/datasets';

import DatasetsItem from './item';
import { MOCK_LAYERS } from './mock';

export default function DatasetsList() {
  // const { groups, isFetching, isFetched, isPlaceholderData, isError } = useDatasetsGroups();

  return (
    <>
      <h3 className="text-xs text-gray-500">Activate data layers on the map</h3>
      <div className="flex flex-col">
        {MOCK_LAYERS.map((l) => {
          if (!l.id || !l.attributes) return null;
          return <DatasetsItem key={l.id} {...l} />;
        })}
      </div>
    </>
  );
}

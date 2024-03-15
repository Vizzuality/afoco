'use client';

// import { useDatasetsGroups } from '@/hooks/datasets';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import DatasetsItem from './item';
import { MOCK_LAYERS } from './mock';

export default function DatasetsList() {
  const [searchValue, setSearchValue] = useState('');
  console.info(searchValue);
  // const { groups, isFetching, isFetched, isPlaceholderData, isError } = useDatasetsGroups();

  return (
    <>
      <div className="relative flex space-x-2">
        <Input
          placeholder="Search datasets by name"
          className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search size={24} className="absolute left-1 top-2" />
      </div>
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

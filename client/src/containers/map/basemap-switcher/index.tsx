import { useCallback } from 'react';

import Image from 'next/image';

import { useAtom } from 'jotai';

import { basemapAtom } from '@/store';

import { BASEMAPS } from '@/constants/basemaps';

const BasemapSwitcher = () => {
  const [basemap, setBasemap] = useAtom(basemapAtom);

  const handleToggleBasemap = useCallback(() => {
    setBasemap(basemap === 'basemap-light' ? 'basemap-satellite' : 'basemap-light');
  }, [basemap, setBasemap]);

  const B = BASEMAPS.find((b) => b.value === basemap);

  return (
    <button
      className="flex h-12 w-8 rounded-3xl border border-green-500 shadow-md"
      onClick={handleToggleBasemap}
    >
      {B && (
        <Image
          src={B['switch-preview']}
          alt={B.label}
          layout="fill"
          objectFit="cover"
          className="!relative rounded-3xl"
        />
      )}
    </button>
  );
};

export default BasemapSwitcher;

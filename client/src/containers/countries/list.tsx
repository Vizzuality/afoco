'use client';

import CountryItem from '@/containers/countries/item';

export default function CountriesList() {
  return (
    <div className="flex flex-col space-y-2">
      <CountryItem />
      <CountryItem />
    </div>
  );
}

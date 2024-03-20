'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { useGetCountries } from '@/types/generated/country';

import CountryItem from '@/containers/countries/item';

import { Input } from '@/components/ui/input';

export default function CountriesList() {
  const [searchValue, setSearchValue] = useState('');

  const { data } = useGetCountries({
    populate: '*',
    filters: {
      name: {
        $contains: searchValue,
      },
    },
  });

  return (
    <div className=" flex flex-col space-y-8">
      <div className="relative">
        <Input
          placeholder="Search country"
          className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search size={24} className="absolute left-1 top-2" />
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-xs text-gray-500">Select a country</p>
        {data?.data && data.data.map((country) => <CountryItem key={country.id} data={country} />)}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

import { Search, X } from 'lucide-react';

import { useGetCountries } from '@/types/generated/country';

import CountryItem from '@/containers/countries/item';

import { Input } from '@/components/ui/input';
import ContentLoader from '@/components/ui/loader';

export default function CountriesList() {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { data, isFetching, isFetched, isError } = useGetCountries({
    populate: '*',
    filters: {
      name: {
        $containsi: searchValue,
      },
    },
  });

  return (
    // <div className=" flex flex-col space-y-8">
    //   <div className="relative">
    //     <Input
    //       type="search"
    //       placeholder="Search country"
    //       className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
    //       onChange={(e) => setSearchValue(e.target.value)}
    //       value={searchValue || ''}
    //     />
    //     <Search size={24} className="absolute left-1 top-2" />
    //     {!!searchValue && (
    //       <button
    //         type="button"
    //         className="absolute right-3 top-3"
    //         aria-label="reset-search"
    //         onClick={() => setSearchValue(null)}
    //       >
    //         <X className="h-3.5 w-3.5 cursor-pointer text-yellow-900" />
    //       </button>
    //     )}
    //   </div>
    //   <div className="flex flex-col space-y-2">
    //     <p className="text-xs text-gray-500">Select a country</p>
    //     {data?.data && data.data.map((country) => <CountryItem key={country.id} data={country} />)}
    //   </div>
    // </div>
    <ContentLoader
      data={data?.data}
      isPlaceholderData={false}
      isFetching={isFetching}
      isFetched={isFetched}
      isError={isError}
      loaderClassName="mt-52"
    >
      <div className="flex flex-col space-y-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search country"
            className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue || ''}
          />
          <Search size={24} className="absolute left-1 top-2" />
          {!!searchValue && (
            <button
              type="button"
              className="absolute right-3 top-3"
              aria-label="reset-search"
              onClick={() => setSearchValue(null)}
            >
              <X className="h-3.5 w-3.5 cursor-pointer text-yellow-900" />
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-xs text-gray-500">Select a country</p>
          {data?.data?.map((country) => (
            <CountryItem key={country.id} data={country} />
          ))}
        </div>
      </div>
    </ContentLoader>
  );
}

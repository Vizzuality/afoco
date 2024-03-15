'use client';

import { useGetCountries } from '@/types/generated/country';

import CountryItem from '@/containers/countries/item';

export default function CountriesList() {
  const { data } = useGetCountries({ populate: '*' });

  return (
    <div className="flex flex-col space-y-2">
      {data?.data && data.data.map((country) => <CountryItem key={country.id} data={country} />)}
    </div>
  );
}

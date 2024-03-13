'use client';

import { useGetCountries } from '@/types/generated/country';
import { useGetCountryIndicatorFields } from '@/types/generated/country-indicator-field';

import CountryItem from '@/containers/countries/item';

export default function CountriesList() {
  const { data } = useGetCountries({ populate: '*' });
  const { data: indicatorData } = useGetCountryIndicatorFields({ populate: '*' });
  console.log('Hola estoy aqui', indicatorData);

  return (
    <div className="flex flex-col space-y-2">
      {data?.data && data.data.map((country) => <CountryItem key={country.id} data={country} />)}
    </div>
  );
}

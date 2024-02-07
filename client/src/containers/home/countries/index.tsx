'use client';

import CountriesList from '@/containers/home/countries/list';

export default function Countries() {
  return (
    <div className="space-y-5 p-5">
      <h2 className="text-3xl font-normal">Country Profile</h2>
      <CountriesList />
    </div>
  );
}

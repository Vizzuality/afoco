'use client';

import CountriesList from '@/containers/countries/list';

export default function Countries() {
  return (
    <div className="space-y-5 px-6 py-8">
      <h2 className="text-3xl font-normal">Country Profile</h2>
      <CountriesList />
    </div>
  );
}

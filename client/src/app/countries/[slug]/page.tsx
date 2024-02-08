import { Metadata } from 'next';

import CountryDetail from '@/containers/countries/detail';

export const metadata: Metadata = {
  title: 'AFoCO',
};

export default function Country() {
  return <CountryDetail />;
}

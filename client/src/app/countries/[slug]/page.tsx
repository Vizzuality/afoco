import { Metadata } from 'next';

import CountryDetailPanel from '@/containers/countries/detail/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Country detail',
  description: '',
};

export default function CountryPage() {
  return <CountryDetailPanel />;
}

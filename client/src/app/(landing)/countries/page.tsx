import { Metadata } from 'next';

import CountriesList from '@/containers/countries/list';
import Panel from '@/containers/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Countries',
  description: '',
};

export default function Countries() {
  return (
    <Panel>
      <div className="space-y-5 px-5 py-7">
        <h2 className="text-3xl font-normal">Country Profile</h2>
        <CountriesList />
      </div>
    </Panel>
  );
}

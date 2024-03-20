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
      <div className="not-prose space-y-5 p-5">
        <h2 className="text-3xl font-normal">Countries</h2>
        <CountriesList />
      </div>
    </Panel>
  );
}

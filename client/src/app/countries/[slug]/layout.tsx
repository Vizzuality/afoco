'use client';

import CountryDetailPanel from '@/containers/countries/detail/panel';
import Panel from '@/containers/panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Panel>
        <CountryDetailPanel />
      </Panel>
      {children}
    </div>
  );
}

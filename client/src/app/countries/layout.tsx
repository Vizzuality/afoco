'use client';

import Countries from '@/containers/countries';
import Panel from '@/containers/panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Panel>
        <Countries />
      </Panel>
      {children}
    </div>
  );
}

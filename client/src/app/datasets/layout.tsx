'use client';

import Datasets from '@/containers/datasets';
import Panel from '@/containers/panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Panel>
        <Datasets />
      </Panel>
      {children}
    </div>
  );
}

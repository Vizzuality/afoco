'use client';

import Panel from '@/containers/panel';
import ProjectDetailPanel from '@/containers/projects/detail/panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Panel>
        <ProjectDetailPanel />
      </Panel>
      {children}
    </div>
  );
}

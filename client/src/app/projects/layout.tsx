'use client';

import Panel from '@/containers/panel';
import Projects from '@/containers/projects';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Panel>
        <Projects />
      </Panel>
      {children}
    </div>
  );
}

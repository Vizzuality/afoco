import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Projects',
  description: '',
};

import Panel from '@/containers/panel';
import ProjectsTabs from '@/containers/projects/tabs';

export default function Projects() {
  return (
    <Panel>
      <div className="space-y-5 py-7">
        <h2 className="px-5 text-3xl font-normal">Projects</h2>
        <ProjectsTabs />
      </div>
    </Panel>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Projects',
  description: '',
};

import Filters from '@/containers/filters';
import Panel from '@/containers/panel';
import ProjectsList from '@/containers/projects/list';

export default function Projects() {
  return (
    <Panel>
      <div className="space-y-5 p-5">
        <h2 className="text-3xl font-normal">Projects</h2>

        <Filters />
        <ProjectsList />
      </div>
    </Panel>
  );
}

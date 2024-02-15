import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Project Detail',
  description: '',
};

import Panel from '@/containers/panel';
import ProjectDetailPanel from '@/containers/projects/detail/panel';

export default function ProjectDetailPage() {
  return (
    <>
      <Panel>
        <ProjectDetailPanel />
      </Panel>
    </>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Project Detail',
  description: '',
};

import ProjectDetailPanel from '@/containers/projects/detail/panel';

export default function ProjectDetailPage() {
  return <ProjectDetailPanel />;
}

import { Metadata } from 'next';

import ProjectDetail from '@/containers/projects/detail';

export const metadata: Metadata = {
  title: 'AFOCO',
};

export default function Project() {
  return <ProjectDetail />;
}

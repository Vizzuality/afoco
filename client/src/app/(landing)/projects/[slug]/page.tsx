import Head from 'next/head';

import { Metadata } from 'next';

import Panel from '@/containers/panel';
import ProjectDetailPanel from '@/containers/projects/detail/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Project Detail',
  description: '',
  openGraph: {
    title: 'AFoCO',
    description: 'Innovative Solutions for Climate Change',
    images: ['./facebook.png'],
  },
};
export default function ProjectDetailPage() {
  return (
    <>
      <Panel>
        <ProjectDetailPanel />
      </Panel>
    </>
  );
}

import { Metadata } from 'next';

import Panel from '@/containers/panel';
import ProjectDetailPanel from '@/containers/projects/detail/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Project Detail',
  description: '',
  metadataBase: new URL('https://afoco-git-af-share-vizzuality1.vercel.app/'),
  openGraph: {
    title: 'AFoCO',
    description: 'Innovative Solutions for Climate Change',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
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

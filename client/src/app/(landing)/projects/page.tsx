import Link from 'next/link';

import { ExternalLink } from 'lucide-react';
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
        <div className="px-5">
          <h2 className="text-3xl font-normal">Projects</h2>

          <p className="items-start py-3 text-xs text-yellow-900">
            Read more about projects on the{' '}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://afocosec.org/programs-projects/projects/"
              className="space-x-2"
            >
              <span className="underline">AFoCo website</span>
              <ExternalLink className="mb-0.5 inline-block h-4 w-4 stroke-[1px]" />
            </Link>{' '}
          </p>
        </div>
        <ProjectsTabs />
      </div>
    </Panel>
  );
}

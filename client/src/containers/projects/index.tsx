'use client';

import ProjectsList from '@/containers/projects/list';

export default function Projects() {
  return (
    <div className="not-prose space-y-5 px-6 py-8">
      <h2 className="text-3xl font-normal">Projects</h2>
      <ProjectsList />
    </div>
  );
}

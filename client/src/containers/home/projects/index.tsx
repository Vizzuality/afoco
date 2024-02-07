'use client';

import ProjectsList from '@/containers/home/projects/list';

export default function Projects() {
  return (
    <div className="space-y-5 p-5">
      <h2 className="text-3xl font-normal">Projects</h2>
      <ProjectsList />
    </div>
  );
}

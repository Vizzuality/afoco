'use client';
import { useGetProjects } from '@/types/generated/project';

import ProjectItem from '@/containers/projects/item';

export default function ProjectsList() {
  const { data } = useGetProjects({ populate: '*' });

  return (
    <div className="no-scrollbar flex max-h-[75vh] flex-col space-y-2 overflow-y-auto">
      {data?.data &&
        data.data.map((project) => (
          <ProjectItem key={project.id} id={`uniqueId${project.id}`} data={project} />
        ))}
    </div>
  );
}

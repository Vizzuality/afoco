import ProjectItem from '@/containers/projects/item';

export default function ProjectsList() {
  return (
    <div className="flex flex-col space-y-2">
      <ProjectItem />
      <ProjectItem />
    </div>
  );
}

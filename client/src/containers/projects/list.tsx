import ProjectItem from '@/containers/projects/item';

export default function ProjectsList() {
  return (
    <div className="no-scrollbar flex max-h-[75vh] flex-col space-y-2 overflow-y-auto">
      <ProjectItem id="uniqueId1" />
      <ProjectItem id="uniqueId2" />
      <ProjectItem id="uniqueId3" />
      <ProjectItem id="uniqueId4" />
      <ProjectItem id="uniqueId5" />
      <ProjectItem id="uniqueId6" />
      <ProjectItem id="uniqueId7" />
      <ProjectItem id="uniqueId8" />
      <ProjectItem id="uniqueId9" />
      <ProjectItem id="uniqueId10" />
      <ProjectItem id="uniqueId11" />
      <ProjectItem id="uniqueId12" />
    </div>
  );
}

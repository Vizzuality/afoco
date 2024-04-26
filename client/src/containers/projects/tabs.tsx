'use client';

import { useSyncProjectsTab } from '@/hooks/datasets/sync-query';

import ProjectsList from '@/containers/projects/list';
import Stats from '@/containers/projects/stats';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectsTabs() {
  const [projectsTab, setProjectsTab] = useSyncProjectsTab();

  return (
    <Tabs defaultValue={projectsTab} className="relative h-full">
      <TabsList className="w-full px-5">
        <TabsTrigger
          value="statistics"
          className="rounded-l-lg"
          data-cy="projects-statistics-tab"
          onClick={() => setProjectsTab('statistics')}
        >
          Statistics
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="rounded-r-lg"
          data-cy="projects-list-tab"
          onClick={() => setProjectsTab('list')}
        >
          List
        </TabsTrigger>
      </TabsList>
      <TabsContent value="statistics" className="relative mt-6 h-full space-y-5">
        <Stats />
      </TabsContent>
      <TabsContent value="list" className="relative mt-6 h-full space-y-5">
        <ProjectsList />
      </TabsContent>
    </Tabs>
  );
}

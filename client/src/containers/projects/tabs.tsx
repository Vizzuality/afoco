'use client';

import { useSyncProjectsTab } from '@/hooks/datasets/sync-query';

import ProjectsList from '@/containers/projects/list';
import Stats from '@/containers/projects/stats';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectsTabs() {
  const [projectsTab, setProjectsTab] = useSyncProjectsTab();
  return (
    <Tabs defaultValue={projectsTab}>
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
      <TabsContent value="statistics" className="mt-6 space-y-5">
        <Stats />
      </TabsContent>
      <TabsContent value="list" className="mt-6 space-y-5">
        <ProjectsList />
      </TabsContent>
    </Tabs>
  );
}
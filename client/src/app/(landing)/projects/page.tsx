import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Projects',
  description: '',
};

import Panel from '@/containers/panel';
import ProjectsList from '@/containers/projects/list';
import Stats from '@/containers/projects/stats';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Projects() {
  return (
    <Panel>
      <div className="space-y-5 px-5 py-7">
        <h2 className="text-3xl font-normal">Projects</h2>
        <Tabs defaultValue="statistics">
          <TabsList className="w-full">
            <TabsTrigger
              value="statistics"
              className="rounded-l-lg"
              data-cy="projects-statistics-tab"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger value="list" className="rounded-r-lg" data-cy="projects-list-tab">
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
      </div>
    </Panel>
  );
}

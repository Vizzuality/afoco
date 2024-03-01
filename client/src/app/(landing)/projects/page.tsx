import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AFoCO | Projects',
  description: '',
};

import Filters from '@/containers/filters';
import Panel from '@/containers/panel';
import ProjectsList from '@/containers/projects/list';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Projects() {
  return (
    <Panel>
      <div className="space-y-5 p-5">
        <h2 className="text-3xl font-normal">Projects</h2>

        <Filters />
        <ProjectsList />
        <Tabs defaultValue="list">
          <TabsList className="w-full">
            <TabsTrigger value="statistics" className="rounded-l-lg">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="list" className="rounded-r-lg">
              List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="statistics" className="mt-6 space-y-5">
            Global Stats
          </TabsContent>
          <TabsContent value="list" className="mt-6 space-y-5">
            <Filters />
            <ProjectsList />
          </TabsContent>
        </Tabs>
      </div>
    </Panel>
  );
}

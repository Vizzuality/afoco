import { Metadata } from 'next';

import DatasetsList from '@/containers/datasets/list';
import Panel from '@/containers/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Datasets',
  description: '',
};

export default function DatasetsPage() {
  return (
    <Panel>
      <div className="h-full space-y-4 overflow-hidden py-8">
        <h2 className="px-6 text-3xl font-normal">Datasets</h2>

        <DatasetsList />
      </div>
    </Panel>
  );
}

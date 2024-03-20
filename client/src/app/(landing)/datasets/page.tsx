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
      <div className="not-prose space-y-4 px-6 py-8">
        <h2 className="text-3xl font-normal">Datasets</h2>

        <DatasetsList />
      </div>
    </Panel>
  );
}

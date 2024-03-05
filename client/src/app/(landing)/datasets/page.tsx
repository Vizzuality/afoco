import { Metadata } from 'next';

import DatasetsList from '@/containers/datasets/list';
import { MOCK_LAYERS } from '@/containers/datasets/mock';
import Panel from '@/containers/panel';

import { Combobox } from '@/components/ui/combobox';

export const metadata: Metadata = {
  title: 'AFoCO | Datasets',
  description: '',
};

export default function DatasetsPage() {
  const options = MOCK_LAYERS.map((layer) => ({
    label: layer.attributes.title,
    value: layer.id,
  }));
  return (
    <Panel>
      <div className="space-y-4 px-6 py-8">
        <h2 className="text-3xl font-normal">Datasets</h2>
        <Combobox placeholder="Search data" options={options} icon />
        <DatasetsList />
      </div>
    </Panel>
  );
}

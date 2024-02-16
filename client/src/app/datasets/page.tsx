import { Metadata } from 'next';

import Datasets from '@/containers/datasets';
import Panel from '@/containers/panel';

export const metadata: Metadata = {
  title: 'AFoCO | Datasets',
  description: '',
};

export default function DatasetsPage() {
  return (
    <Panel>
      <Datasets />
    </Panel>
  );
}

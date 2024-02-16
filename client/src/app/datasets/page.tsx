import { Metadata } from 'next';

import Datasets from '@/containers/datasets';

export const metadata: Metadata = {
  title: 'AFoCO | Datasets',
  description: '',
};

export default function DatasetsPage() {
  return <Datasets />;
}

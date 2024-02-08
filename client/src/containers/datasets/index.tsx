'use client';

import DatasetsList from '@/containers/datasets/list';

export default function Datasets() {
  return (
    <div className="space-y-5 p-5">
      <h2 className="text-3xl font-normal">Datasets</h2>
      <DatasetsList />
    </div>
  );
}

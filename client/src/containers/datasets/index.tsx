'use client';

import DatasetsList from '@/containers/datasets/list';

import { Switch } from '@/components/ui/switch';

export default function Datasets() {
  return (
    <div className="space-y-5 p-5">
      <h2 className="text-3xl font-normal">Datasets</h2>
      <DatasetsList />
      <Switch onCheckedChange={() => console.log()} />
    </div>
  );
}

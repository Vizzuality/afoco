'use client';

import { useAtomValue } from 'jotai';

import { dashboardAtom } from '@/store';

import ProjectDashboard from '@/containers/projects/detail/dashboard';

export default function ProjectDetail() {
  const dashboard = useAtomValue(dashboardAtom);

  return (
    <div className="grid h-screen grid-cols-12 items-center justify-center text-3xl text-yellow-900">
      {dashboard && <ProjectDashboard />}
    </div>
  );
}

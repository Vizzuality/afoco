'use client';

import { useParams } from 'next/navigation';

import { useAtomValue } from 'jotai';

import { dashboardAtom } from '@/store';

import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ProjectDetail() {
  const { slug } = useParams();
  const dashboard = useAtomValue(dashboardAtom);

  return (
    <div className="flex grid h-screen grid-cols-12 items-center justify-center text-3xl text-yellow-900">
      Detail of project {slug}
      {dashboard && (
        <div className="bg-decoration-neutral-50 absolute bottom-2 right-6 top-2 z-10 box-content w-7/12 rounded-3xl px-3 py-8 shadow-md">
          <div className="px-3">
            <h3 className="mb-4 text-xl font-extrabold text-gray-400">Overview</h3>
            <div className="flex space-x-6">
              <div className="w-1/3 rounded-xl bg-white p-4 text-sm text-green-800 shadow-sm">
                Planted area
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

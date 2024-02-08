'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAtom } from 'jotai';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import { dashboardAtom } from '@/store';

import { Button } from '@/components/ui/button';

export default function ProjectDetailPanel() {
  const [dashboard, setDashboard] = useAtom(dashboardAtom);

  return (
    <div className="bg-decoration-neutral-50 p-6">
      <div className="absolute left-0 top-0 w-full">
        <div className="relative">
          <Image
            src="/images/projects/detail/placeholder.png"
            alt="AFOCO"
            width={300}
            height={300}
            className="w-full rounded-t-[24px]"
          />
          <h2 className="absolute bottom-6 mx-6 text-xl font-semibold text-white">
            Innovative Solutions for Climate Change and Biodiversity Landscape Strategy to Support
            SDGs in Indonesia
          </h2>
        </div>
      </div>

      <Link
        href="/"
        className="absolute top-6 z-10 flex items-center space-x-3 text-xs text-yellow-900"
      >
        <ArrowLeft className="h-4 w-4 text-yellow-900" />
        <p>Back</p>
      </Link>
      <p className="mt-72 pt-2 text-sm text-gray-500">
        The project will introduce innovative solutions for sustainable management practices and
        enhance the capacities of Forest Management Units (FMUs) and local communities on
        contributing to Indonesia’s emissions reduction targets and improve biodiversity landscapes
        to support the achievement of the Sustainable Development Goals (SDGs), in particular, SDGs
        1, 8, 13 and 15.
      </p>
      <Button
        variant="default"
        className="group fixed bottom-6 right-6 space-x-2"
        size="lg"
        onClick={() => {
          setDashboard(!dashboard);
        }}
      >
        <p className="w-36">{dashboard ? 'Hide dashboard' : 'Show dashboard'}</p>
        <ChevronRight className="h-4 w-4 text-yellow-900 group-hover:text-yellow-50" />
      </Button>
    </div>
  );
}

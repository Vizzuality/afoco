'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAtomValue } from 'jotai';

import { cn } from '@/lib/classnames';

import { hoveredProjectAtom } from '@/store';

export default function ProjectItem({ id }: { id: string }) {
  const hoveredProject = useAtomValue(hoveredProjectAtom);

  return (
    <Link
      href={'/projects/indonesia-landscape'}
      data-cy="project-item-link"
      className={cn({
        'flex space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 shadow-sm transition-all duration-300 hover:border-yellow-500':
          true,
        'border-yellow-500': hoveredProject === id,
      })}
      id={id}
    >
      <Image src="/images/projects/placeholder.png" alt="Project Image" width={300} height={300} />
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-bold text-yellow-900" id="project-detail-title">
          Innovative Solutions for Climate Change and Biodiversity Landscape Strategy to Support
          SDGs in Indonesia
        </h3>
        <div className="text-2xs flex space-x-6 pb-2.5 text-gray-500">
          <p>Agroforestry</p>
          <p>Vietnam</p>
          <p>Complete</p>
        </div>
      </div>
    </Link>
  );
}

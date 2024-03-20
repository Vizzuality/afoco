'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAtomValue } from 'jotai';

import { cn } from '@/lib/classnames';

import { hoveredProjectAtom } from '@/store';

import { ProjectListResponseDataItem } from '@/types/generated/strapi.schemas';

import { useSyncQueryParams } from '@/hooks/datasets';

export default function ProjectItem({ data }: { data: ProjectListResponseDataItem }) {
  const hoveredProject = useAtomValue(hoveredProjectAtom);
  const queryParams = useSyncQueryParams();

  return (
    data && (
      <Link
        href={`/projects/${data?.attributes?.project_code}${queryParams}`}
        data-cy="project-item-link"
        className={cn({
          'flex space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 shadow-sm transition-all duration-300 hover:border-yellow-500':
            true,
          'border-yellow-500': hoveredProject === data?.id?.toString(),
        })}
        id={data?.id?.toString()}
      >
        <Image
          src="/images/projects/placeholder.png"
          alt="Project Image"
          width={300}
          height={300}
          className="max-w-[100px]"
        />
        <div className="flex flex-col space-y-2">
          <h3 className="line-clamp-4 text-sm font-bold text-yellow-900" id="project-detail-title">
            {data?.attributes?.name}
          </h3>
          <div className="text-2xs flex space-x-6 pb-2.5 text-gray-500">
            <p>Agroforestry</p>
            <p>Vietnam</p>
            <p>Complete</p>
          </div>
        </div>
      </Link>
    )
  );
}

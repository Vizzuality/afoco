'use client';

import Image from 'next/image';
// import Link from 'next/link';

import { useAtomValue } from 'jotai';

import { cn } from '@/lib/classnames';

import { hoveredProjectMapAtom } from '@/store';

import { ProjectListResponseDataItem } from '@/types/generated/strapi.schemas';

// import { useSyncQueryParams } from '@/hooks/datasets';

export default function ProjectItem({ data }: { data: ProjectListResponseDataItem }) {
  const hoveredProjectMap = useAtomValue(hoveredProjectMapAtom);
  // const queryParams = useSyncQueryParams({}, { bbox: data.attributes?.bbox });

  return (
    data && (
      <div
        // href={`/projects/${data?.attributes?.project_code}${queryParams}`}
        data-cy="project-item-link"
        className={cn({
          'flex space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 shadow-sm transition-all duration-300 hover:border-yellow-500':
            true,
          'border-yellow-500':
            !!data?.attributes?.project_code &&
            hoveredProjectMap?.includes(data?.attributes?.project_code),
        })}
        id={data?.attributes?.project_code}
      >
        <Image
          src={
            data.attributes?.main_image?.data?.attributes?.url ||
            '/images/projects/item-placeholder.png'
          }
          alt="Project Image"
          width={350}
          height={300}
          className="w-28 rounded-lg object-cover"
        />
        <div className="flex h-32 w-2/3 flex-col justify-between">
          <h3
            className="line-clamp-4 text-left text-sm font-bold text-yellow-900"
            id="project-detail-title"
          >
            {data?.attributes?.name}
          </h3>
          <div className="text-2xs flex justify-between pb-2.5 text-gray-500">
            <p>{data?.attributes?.status}</p>
            <p>{data?.attributes?.project_code}</p>
          </div>
        </div>
      </div>
    )
  );
}

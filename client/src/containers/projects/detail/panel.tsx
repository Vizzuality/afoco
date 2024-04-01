'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import { useAtom } from 'jotai';
import { ArrowLeft, ChevronRight, Share as Download, X } from 'lucide-react';

import { formatCompactNumber } from '@/lib/utils/formats';

import { dashboardAtom } from '@/store';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';
import { useGetProjects } from '@/types/generated/project';
import {
  InterventionTypeListResponseDataItem,
  Project,
  ProjectProjectIndicatorFields,
} from '@/types/generated/strapi.schemas';

import { useSyncQueryParams } from '@/hooks/datasets';

import { COLUMNS, CSV_COLUMNS_ORDER } from '@/containers/projects/detail/constants';
import Share from '@/containers/share';

import DescriptionWithoutMarkdown from '@/components/description-without-markdown';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ProjectDashboard from './dashboard';

export default function ProjectDetailPanel() {
  const params = useParams<{ id: string }>();

  const queryParams = useSyncQueryParams();
  const [dashboard, setDashboard] = useAtom(dashboardAtom);

  const { data } = useGetProjects(
    {
      populate: '*',
      filters: {
        project_code: params.id,
      },
    },
    {
      query: {
        select: (response) => response?.data && response.data[0].attributes,
      },
    }
  );
  const { data: indicators } = useGetIndicatorFields(
    {
      populate: '*',
      filters: {
        project: { project_code: params.id },
      },
    },
    {
      query: {
        select: (response) =>
          Object.assign(
            {},
            ...(response.data ?? []).map((item) => ({
              [item.attributes?.indicator_name as string]: item.attributes?.value,
            }))
          ),
      },
    }
  );

  const jsonToCsv = (json: ProjectProjectIndicatorFields & Project) => {
    let csv = '';

    const parsedJsonData = [
      Object.entries(json ?? {})
        .map((entry) => {
          if (entry[0] === 'countries' || entry[0] === 'intervention_types')
            return {
              [entry[0]]: entry[1].data.map(
                (el: InterventionTypeListResponseDataItem) => el.attributes?.name
              ),
            };
          return { [entry[0]]: entry[1] };
        })
        .reduce(function (result, current) {
          return Object.assign(result, current);
        }, []),
    ];

    const headers = Object.keys(json ?? {}).filter((el) => COLUMNS.includes(el));
    headers.sort(
      (a: string, b: string) =>
        CSV_COLUMNS_ORDER[a as keyof typeof CSV_COLUMNS_ORDER] -
        CSV_COLUMNS_ORDER[b as keyof typeof CSV_COLUMNS_ORDER]
    );

    csv += headers.join(',') + '\n';

    parsedJsonData?.forEach(function (row: { [key: string]: number | object | string[] }) {
      const data = headers
        .map((header) => {
          if (Array.isArray(row[header])) return `"${row[header].toString()}"`;

          if (typeof row[header] === 'object' && !Array.isArray(row[header])) {
            return `"${JSON.stringify(row[header]).replace(/"/g, "'")}"`;
          }
          return JSON.stringify(row[header]);
        })
        .join(',');
      csv += data + '\n';
    });

    return csv;
  };

  const downloadCSVProjectData = () => {
    const dataToDownload = { ...indicators, ...data };

    const csvData = jsonToCsv(dataToDownload || {}); // Provide a default value of an empty object if data is undefined
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data?.name}.csv`;
    document.body.appendChild(a);
    a.click();
  };

  if (!params.id) {
    return notFound();
  }

  return (
    <div className="no-scrollbar h-full overflow-x-hidden rounded-3xl bg-neutral-50 p-6 pb-40">
      <div className="absolute left-0 top-0 w-full">
        <div className="relative">
          <Image
            src="/images/projects/detail/placeholder.png"
            alt="AFOCO"
            width={300}
            height={300}
            className="w-full rounded-t-[24px]"
          />
          <h2 className="absolute bottom-6 mx-6 text-xl font-semibold text-white">{data?.name}</h2>
        </div>
      </div>
      <div className="absolute left-6 right-6 top-4 z-10 flex justify-between">
        <Link
          href={`/projects${queryParams}`}
          className="flex items-center space-x-3 rounded px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-100"
        >
          <ArrowLeft className="h-4 w-4 text-yellow-900" />
          <p>Back</p>
        </Link>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="rounded-full" onClick={downloadCSVProjectData}>
                <Download className="rotate-180 text-yellow-900" size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={'left'} sideOffset={20}>
              <p className="text-sm text-yellow-900">Download project</p>
            </TooltipContent>
          </Tooltip>

          <Share />
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <p className="mt-72 pt-2 text-sm text-gray-500">
          <DescriptionWithoutMarkdown description={data?.description} />
        </p>
        <div>
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Status</p>
            <p className="text-sm text-yellow-900">{data?.status}</p>
          </div>
          {/* <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Priority areas</p>
            <p className="text-sm text-yellow-900">{}</p>
          </div> */}
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Location</p>
            <p className="text-sm text-yellow-900">
              {data?.countries?.data?.map((d) => d?.attributes?.name).join(', ')}
            </p>

            {/* <Tooltip>
              <TooltipTrigger asChild>
                <p className="cursor-pointer text-sm text-yellow-900 underline hover:no-underline">
                  {value}
                </p>
              </TooltipTrigger>
              <TooltipContent side={'top'} sideOffset={4} className="rounded-lg border-none p-4">
                <ol className="text-sm text-yellow-900">
                  {PANEL_OVERVIEW_ITEMS.find((item) => item.title === title)?.items?.map(
                    (item, idx) => (
                      <li key={idx}>
                        {idx + 1}. {item.title}
                      </li>
                    )
                  )}
                </ol>
                <TooltipArrow className="fill-white" />
              </TooltipContent>
            </Tooltip> */}
          </div>
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Duration</p>
            <p className="text-sm text-yellow-900">{data?.duration}</p>
          </div>
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Donors</p>
            <p className="text-sm text-yellow-900">{data?.donors}</p>
          </div>
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
            <p className="text-xs font-medium uppercase text-gray-500">Investment</p>
            <p className="text-sm text-yellow-900">
              {formatCompactNumber(indicators?.project_funding?.total_funding)}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs font-medium uppercase text-yellow-900">Project Gallery</h4>
          <div className="flex space-x-1">
            <Image
              src="/images/projects/detail/placeholder.png"
              alt="AFOCO"
              width={170}
              height={170}
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
              <Image
                src="/images/projects/detail/placeholder.png"
                alt="AFOCO"
                width={86}
                height={86}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            If you have pictures of this project to share, please sent them to{' '}
            <a className="underline hover:no-underline" href="mailto:email@afoco.com">
              email@afoco.com
            </a>
          </p>
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild className="group">
          <Button
            variant="primary"
            className="fixed bottom-6 right-6 z-50 w-48 space-x-2"
            size="base"
            data-cy="project-dashboard-button"
            onClick={() => setDashboard(!dashboard)}
          >
            <p className="block group-data-[state=open]:hidden">{'Show dashboard'}</p>
            <p className="block group-data-[state=closed]:hidden">{'Hide dashboard'}</p>
            <ChevronRight className="h-4 w-4 text-yellow-900 group-hover:text-yellow-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="left-[514px] w-[calc(100vw-570px)]">
          <ProjectDashboard id={params.id} />
          <DrawerClose
            className="focus:ring-ring absolute -right-6 top-7 z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            onClick={() => setDashboard(false)}
          >
            <X className="h-4 w-4 text-yellow-400" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

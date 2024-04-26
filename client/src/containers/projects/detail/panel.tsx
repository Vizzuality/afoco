'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useAtom } from 'jotai';
import { ArrowLeft, ChevronRight, Share as Download, X } from 'lucide-react';

import { cn } from '@/lib/classnames';
import { formatCompactNumber } from '@/lib/utils/formats';
import { DescriptionWithoutMarkdown } from '@/lib/utils/markdown';

import { dashboardAtom } from '@/store';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';
import { useGetProjects } from '@/types/generated/project';
import {
  InterventionTypeListResponseDataItem,
  Project,
  ProjectProjectIndicatorFields,
} from '@/types/generated/strapi.schemas';

import { COLUMNS, CSV_COLUMNS_ORDER } from '@/containers/projects/detail/constants';
import Share from '@/containers/share';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ContentLoader from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ProjectDashboard from './dashboard';

export default function ProjectDetailPanel() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [dashboard, setDashboard] = useAtom(dashboardAtom);

  const { data, isFetching, isFetched, isError } = useGetProjects(
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

  const {
    data: indicators,
    isFetching: indicatorsIsFetching,
    isFetched: indicatorsIsFetched,
    isError: indicatorIsFetched,
  } = useGetIndicatorFields(
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
    <div className="relative h-full rounded-3xl bg-neutral-50">
      <div className="absolute left-0 top-0 w-full">
        {data && indicators && (
          <div className="relative">
            {data.main_image?.data?.attributes?.url && (
              <div>
                <div className="bg-gradient-image absolute z-10 h-52 w-full rounded-t-[24px] bg-[#2B1A0066]" />

                <Image
                  src={data.main_image?.data?.attributes?.url}
                  alt="AFOCO"
                  width={300}
                  height={300}
                  className="h-52 w-full rounded-t-[24px] object-cover"
                />
              </div>
            )}
            {!data.main_image?.data?.attributes?.url && (
              <div>
                <Image
                  src={'/images/projects/detail-placeholder.png'}
                  alt="AFOCO"
                  width={300}
                  height={300}
                  className="h-52 w-full rounded-t-[24px] object-cover"
                />
              </div>
            )}

            <h2
              className={cn({
                'absolute bottom-6 z-20 mx-6 text-lg font-semibold leading-6 text-white': true,
                'text-base': !!data?.name?.length && data?.name?.length > 120,
                'text-yellow-900': !data.main_image?.data?.attributes?.url,
              })}
            >
              {data?.name}
            </h2>
          </div>
        )}
      </div>
      <div className="absolute left-6 right-6 top-4 z-10 flex justify-between">
        <button
          className="flex items-center space-x-1 rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-900 transition-all hover:bg-yellow-400"
          type="button"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 text-yellow-900" />
          <p className="leading-6">Back</p>
        </button>
        {data && indicators && (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="rounded-full"
                  onClick={downloadCSVProjectData}
                >
                  <Download className="rotate-180 text-yellow-900" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={'left'} sideOffset={20}>
                <p className="text-sm text-yellow-900">Download project</p>
              </TooltipContent>
            </Tooltip>

            <Share />
          </div>
        )}
      </div>
      <ContentLoader
        data={data && indicators}
        isPlaceholderData={false}
        isFetching={isFetching || indicatorsIsFetching}
        isFetched={isFetched && indicatorsIsFetched}
        isError={isError || indicatorIsFetched}
        loaderClassName="mt-52"
      >
        <div className="relative h-full">
          <div className="absolute bottom-0 top-0 h-full w-full overflow-hidden">
            <ScrollArea className="mt-52 flex h-full flex-col space-y-8 px-5 pb-52">
              {data?.description && (
                <p className="pt-2 text-sm text-gray-500">
                  <DescriptionWithoutMarkdown description={data?.description} />
                </p>
              )}

              <div>
                <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
                  <p className="text-xs font-medium uppercase text-gray-500">Status</p>
                  <p className="text-sm text-yellow-900">{data?.status}</p>
                </div>
                <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
                  <p className="text-xs font-medium uppercase text-gray-500">Location</p>
                  <p className="text-sm text-yellow-900">
                    {data?.countries?.data?.map((d) => d?.attributes?.name).join(', ')}
                  </p>
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
              <div className="flex flex-col space-y-1 pt-6">
                {!!data?.gallery?.data?.length && (
                  <>
                    <h4 className="pb-1 text-xs font-medium uppercase text-yellow-900">
                      Project Gallery
                    </h4>
                    <div className="flex w-full space-x-1">
                      <div className="flex w-1/2 flex-col space-y-[1px]">
                        {data.gallery.data.map((img, index) => (
                          <div key={index}>
                            {index >= 0 && index % 5 === 0 && (
                              <div className="flex h-[132px] space-x-1">
                                <Image
                                  src={img?.attributes?.url ?? '/images/projects/placeholder.png'}
                                  alt="AFOCO"
                                  width={165}
                                  height={170}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mb-auto grid w-1/2 grid-cols-2 gap-1">
                        {data.gallery.data.map(
                          (img, index) =>
                            index > 0 &&
                            index % 5 != 0 && (
                              <div key={index} className="flex h-16 w-full space-x-1">
                                <Image
                                  src={img?.attributes?.url ?? '/images/projects/placeholder.png'}
                                  alt="AFOCO"
                                  width={165}
                                  height={165}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </>
                )}

                <p className="pb-16 text-sm text-gray-500">
                  If you have pictures of this project to share, please sent them to{' '}
                  <a className="underline hover:no-underline" href="mailto:contact@afocosec.org">
                    contact@afocosec.org
                  </a>
                </p>
              </div>
            </ScrollArea>
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
          <DrawerContent className="left-[432px] w-[calc(100vw-490px)] xl:left-[514px] xl:w-[calc(100vw-570px)]">
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
      </ContentLoader>
    </div>
  );
}

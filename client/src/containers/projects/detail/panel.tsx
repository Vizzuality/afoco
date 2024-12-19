'use client';

import { useLayoutEffect, useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';

import { useAtom, useSetAtom } from 'jotai';
import { ChevronRight, X } from 'lucide-react';

import { formatCompactNumber } from '@/lib/utils/formats';
import { DescriptionWithoutMarkdown } from '@/lib/utils/markdown';

import { dashboardAtom } from '@/store';
import { tmpBboxAtom } from '@/store';

import { useGetIndicatorFields } from '@/types/generated/indicator-field';
import { useGetProjects } from '@/types/generated/project';

import { useSyncBbox } from '@/hooks/datasets/sync-query';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ContentLoader from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';

import ProjectDashboard from './dashboard';

import Header from './header';

export default function ProjectDetailPanel() {
  const params = useParams<{ id: string }>();
  const [dashboard, setDashboard] = useAtom(dashboardAtom);
  const setTempBbox = useSetAtom(tmpBboxAtom);
  const [dynamicHeight, setDynamicHeight] = useState(208);

  const [URLBbox] = useSyncBbox();

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

  useEffect(() => {
    if (data?.bbox && !URLBbox) {
      setTempBbox(data?.bbox);
    }
  }, [data, setTempBbox, URLBbox]);

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

  if (!params.id) {
    return notFound();
  }

  const headerRef = useRef<HTMLDivElement>(null); // Ref to measure the height of the Header
  const [headerHeight, setHeaderHeight] = useState(0); // State to store the height of the Header

  useLayoutEffect(() => {
    const refElement = headerRef.current;

    if (refElement) {
      // Calculate height after the DOM updates
      setTimeout(() => {
        setHeaderHeight(refElement.offsetHeight);
      }, 0);
    }
  }, []); // Run once after initial render

  return (
    <div className="relative flex h-full flex-col rounded-3xl bg-neutral-50">
      <div className="relative min-h-fit bg-green-900" ref={headerRef}>
        <Header
          data={data}
          indicators={indicators}
          dynamicHeight={dynamicHeight}
          setDynamicHeight={setDynamicHeight}
        />
      </div>
      <ContentLoader
        data={data && indicators}
        isPlaceholderData={false}
        isFetching={isFetching || indicatorsIsFetching}
        isFetched={isFetched && indicatorsIsFetched}
        isError={isError || indicatorIsFetched}
        loaderClassName="mt-52"
      >
        <ScrollArea className="flex h-full w-full flex-col space-y-8 px-5 pb-52">
          <div style={{ top: dynamicHeight, position: 'absolute', left: 20, right: 20 }}>
            {data?.description && (
              <p className="pt-2 text-sm text-gray-500">
                <DescriptionWithoutMarkdown description={data?.description} />
              </p>
            )}

            <div>
              <div className="flex justify-between border-b-2 border-dotted border-gray-400 py-4">
                <p className="text-xs font-medium uppercase text-gray-500">Project code</p>
                <p className="text-sm text-yellow-900">{data?.project_code}</p>
              </div>
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
          </div>
        </ScrollArea>

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

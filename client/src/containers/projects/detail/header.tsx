'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';

import { useSetAtom } from 'jotai';

import { cn } from '@/lib/classnames';

import { tmpBboxAtom } from '@/store';

import {
  InterventionTypeListResponseDataItem,
  Project,
  ProjectProjectIndicatorFields,
} from '@/types/generated/strapi.schemas';

import { useSyncBbox } from '@/hooks/datasets/sync-query';

import { COLUMNS, CSV_COLUMNS_ORDER } from '@/containers/projects/detail/constants';

import HeaderControls from './header-controls';

export default function Header({
  data,
  indicators,
  dynamicHeight,
  setDynamicHeight,
}: {
  data: Project | undefined;
  indicators: ProjectProjectIndicatorFields;
  dynamicHeight: number;
  setDynamicHeight: (height: number) => void;
}) {
  const params = useParams<{ id: string }>();
  const setTempBbox = useSetAtom(tmpBboxAtom);
  const [URLBbox] = useSyncBbox();

  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (data?.bbox && !URLBbox) {
      setTempBbox(data?.bbox);
    }
  }, [data, setTempBbox, URLBbox]);

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

  useLayoutEffect(() => {
    if (h2Ref.current) {
      const h2Height = h2Ref.current.offsetHeight;
      const calculatedHeight = h2Height + 48 + 64;
      setDynamicHeight(Math.max(calculatedHeight, 208));
    }
  }, [data?.name, setDynamicHeight]);

  if (!params.id) {
    return notFound();
  }

  return (
    <div className="relative h-full rounded-3xl bg-neutral-50">
      <div className="absolute h-full w-full">
        <div className="relative">
          {data && indicators && (
            <div className="relative" style={{ height: `${dynamicHeight}px` }}>
              {/* Header Controls */}
              <HeaderControls
                data={data}
                indicators={indicators}
                downloadCSVProjectData={downloadCSVProjectData}
              />

              {/* Image Container */}
              <div className="relative w-full" style={{ height: `${dynamicHeight}px` }}>
                {/* Gradient Background */}
                <div className="absolute inset-0 z-0 rounded-t-[24px] bg-[#2B1A0066]" />

                {/* Main Image or Placeholder */}
                {data.main_image?.data?.attributes?.url ? (
                  <Image
                    src={data.main_image?.data?.attributes?.url}
                    alt="AFOCO"
                    width={300}
                    height={300}
                    className="absolute inset-0 z-10 w-full rounded-t-[24px] object-cover"
                    style={{ height: `${dynamicHeight}px` }}
                  />
                ) : (
                  <Image
                    src={'/images/projects/detail-placeholder.png'}
                    alt="AFOCO"
                    width={300}
                    height={300}
                    className="absolute inset-0 z-10 w-full rounded-t-[24px] object-cover"
                    style={{ height: `${dynamicHeight}px` }}
                  />
                )}
              </div>

              {/* Title */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end px-6"
                style={{ paddingTop: '64px', paddingBottom: '24px', height: `${dynamicHeight}px` }}
              >
                <h2
                  ref={h2Ref}
                  className={cn({
                    'text-lg font-semibold leading-6 text-white': true,
                    'text-base': !!data?.name?.length && data?.name?.length > 120,
                    'text-yellow-900': !data.main_image?.data?.attributes?.url,
                  })}
                >
                  {data?.name || 'Default Title'} {/* Fallback for empty data */}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

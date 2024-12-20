'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useSetAtom } from 'jotai';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { tmpBboxAtom } from '@/store';

import { useSyncQueryParams } from '@/hooks/datasets';
import { useSyncLayers } from '@/hooks/datasets/sync-query';

import { TABS } from '@/containers/sidebar/constants';
import type { SidebarTab } from '@/containers/sidebar/constants';

import { DEFAULT_BBOX } from '@/components/map/constants';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useSyncQueryParams();
  const setTmpBbox = useSetAtom(tmpBboxAtom);

  const [layers] = useSyncLayers();

  const [sidebarTab, setSidebarTab] = useState<'projects' | 'countries' | 'datasets'>('projects');

  const handleClick = useCallback(() => {
    router.push('/');
    setTmpBbox(DEFAULT_BBOX);
  }, [router, setTmpBbox]);

  return (
    <div className="rounded-8xl absolute bottom-0 left-2 top-0 z-20 my-2 w-16 bg-yellow-700 py-10 text-xs text-yellow-50 xl:left-3 xl:w-20">
      <div className="h-[88%]">
        <button
          type="button"
          onClick={handleClick}
          className="mx-2 hidden items-center pb-12 xl:block"
        >
          <Image src="/images/logo.svg" alt="logo" width={60} height={29} />
        </button>

        <div className="mx-2 flex items-center pb-12 xl:hidden">
          <Image src="/images/logo.svg" alt="logo" width={48} height={19} />
        </div>

        <ul className="flex h-full flex-col">
          {TABS.map(({ name, icon, href }) => (
            <Link
              href={`${href}${queryParams}`}
              key={name}
              data-cy={`sidebar-tab-${name}`}
              className={cn({
                'xl:rounded-8xl mx-auto mt-2 flex h-12 w-12 flex-col items-center justify-center space-y-1 rounded-full border-2 border-transparent text-center hover:border-yellow-50 xl:mx-2 xl:h-32 xl:w-auto xl:py-10 xl:py-2':
                  true,
                'bg-yellow-600': pathname.includes(name),
              })}
              onClick={() => setSidebarTab(name as SidebarTab)}
            >
              <div className="relative">
                <Image
                  src={sidebarTab === name ? icon.selected : icon.default}
                  alt={name}
                  width={24}
                  height={24}
                  className="h-7 h-8 xl:h-6 xl:w-6"
                />

                {name === 'datasets' && layers.length > 0 && (
                  <div
                    className={cn({
                      'absolute bottom-1 left-4 h-4 w-4 rounded-full bg-yellow-300 text-xs font-semibold text-yellow-700':
                        true,
                      'bg-yellow-300 text-white': sidebarTab === name,
                    })}
                  >
                    {layers.length}
                  </div>
                )}
              </div>
              <p className="hidden capitalize xl:block">{name}</p>
            </Link>
          ))}
          <a
            className="mt-auto flex flex-col items-center space-y-2"
            href="https://afocosec.org/contact/"
            target="_blank"
          >
            <HelpCircle
              className="rounded-full text-yellow-50 hover:bg-yellow-50 hover:text-yellow-600"
              size={24}
              strokeWidth={1}
            />
            <p className="text-base">Help</p>
          </a>
        </ul>
      </div>
    </div>
  );
}

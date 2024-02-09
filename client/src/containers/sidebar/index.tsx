'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAtom } from 'jotai';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { sidebarTabAtom } from '@/store';

import type { SidebarTab } from '@/containers/sidebar/constants';
import { TABS } from '@/containers/sidebar/constants';

import Icon from '@/components/ui/icon';

export default function Sidebar() {
  const [sidebarTab, setSidebarTab] = useAtom(sidebarTabAtom);

  return (
    <div className="rounded-8xl absolute bottom-0 left-4 top-0 z-20 my-2 w-20 bg-yellow-700 py-10 text-xs text-yellow-50">
      <div className="h-[88%]">
        <div className="flex flex-col items-center pb-12">
          <Image src="/images/logo.svg" alt="logo" width={62} height={29} />
        </div>
        <ul className="flex h-full flex-col">
          {TABS.map(({ name, icon, href }) => (
            <Link
              href={href}
              key={name}
              className={cn({
                'rounded-8xl mx-2 mt-2 flex flex-col items-center space-y-1 border border-2 border-transparent py-10 text-center':
                  true,
                'bg-yellow-600': sidebarTab === name,
                'hover:border-yellow-50': sidebarTab !== name,
              })}
              onClick={() => setSidebarTab(name as SidebarTab)}
            >
              <div className="relative">
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn({
                    'h-6 w-6 fill-current text-yellow-50': true,
                    'text-white': sidebarTab === name,
                  })}
                />
                <div
                  className={cn({
                    'absolute bottom-1 left-4 h-4 w-4 rounded-full bg-yellow-300 text-xs font-semibold text-yellow-700':
                      true,
                    'bg-yellow-300 text-white': sidebarTab === name,
                  })}
                >
                  2
                </div>
              </div>
              <p className="capitalize">{name}</p>
            </Link>
          ))}
          <div className="mt-auto flex flex-col items-center space-y-2">
            <HelpCircle className="text-yellow-50" size={24} strokeWidth={1} />
            <p className="text-base">Help</p>
          </div>
        </ul>
      </div>
    </div>
  );
}

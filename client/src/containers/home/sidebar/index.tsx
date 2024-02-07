'use client';

import Image from 'next/image';

import { useAtomValue, useSetAtom } from 'jotai';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { sidebarTabAtom } from '@/store';

import Icon from '@/components/ui/icon';
import COUNTRIES_SVG from '@/svgs/sidebar/countries.svg';
import DATASETS_SVG from '@/svgs/sidebar/datasets.svg';
import PROJECTS_SVG from '@/svgs/sidebar/projects.svg';

export default function Sidebar() {
  const sidebarTab = useAtomValue(sidebarTabAtom);
  const setSidebarTab = useSetAtom(sidebarTabAtom);
  return (
    <div className="rounded-8xl absolute bottom-0 left-6 top-0 z-10 my-2 w-20 bg-yellow-700 py-10 text-xs text-yellow-50">
      <div className="h-[88%]">
        <div className="flex flex-col items-center pb-12">
          <Image src="/images/logo.svg" alt="logo" width={62} height={29} />
        </div>
        <ul className="flex h-full flex-col">
          <button
            className={cn({
              'rounded-8xl mx-2 mt-2 flex flex-col items-center space-y-1 border border-2 border-transparent py-10 text-center hover:border-yellow-50':
                true,
              'bg-yellow-600 text-white': sidebarTab === 'projects',
            })}
            onClick={() => setSidebarTab('projects')}
          >
            <div className="relative">
              <Icon
                icon={PROJECTS_SVG}
                className={cn({
                  'h-6 w-6 stroke-yellow-50': true,
                  'stroke-white': sidebarTab === 'projects',
                })}
              />
              <div
                className={cn({
                  'absolute bottom-1 left-4 h-4 w-4 rounded-full bg-yellow-300 text-xs font-semibold text-yellow-700':
                    true,
                  'bg-yellow-300 text-white': sidebarTab === 'projects',
                })}
              >
                2
              </div>
            </div>
            <p>Projects</p>
          </button>
          <button
            className={cn({
              'rounded-8xl mx-2 mt-2 flex flex-col items-center space-y-1 border border-2 border-transparent py-10 text-center hover:border-yellow-50':
                true,
              'bg-yellow-600': sidebarTab === 'countries',
            })}
            onClick={() => setSidebarTab('countries')}
          >
            <div className="relative">
              <Icon
                icon={COUNTRIES_SVG}
                className={cn({
                  'h-6 w-6 stroke-yellow-50': true,
                  'stroke-white': sidebarTab === 'countries',
                })}
              />
              <div
                className={cn({
                  'absolute bottom-1 left-4 h-4 w-4 rounded-full bg-yellow-300 text-xs font-semibold text-yellow-700':
                    true,
                  'bg-yellow-300 text-white': sidebarTab === 'countries',
                })}
              >
                2
              </div>
            </div>
            <p>Country profile</p>
          </button>
          <button
            className={cn({
              'rounded-8xl mx-2 mt-2 flex flex-col items-center space-y-1 border border-2 border-transparent py-10 text-center hover:border-yellow-50':
                true,
              'bg-yellow-600': sidebarTab === 'datasets',
            })}
            onClick={() => setSidebarTab('datasets')}
          >
            <div className="relative">
              <Icon
                icon={DATASETS_SVG}
                className={cn({
                  'h-6 w-6 stroke-yellow-50': true,
                  'stroke-white': sidebarTab === 'datasets',
                })}
              />
              <div
                className={cn({
                  'absolute bottom-1 left-4 h-4 w-4 rounded-full bg-yellow-300 text-xs font-semibold text-yellow-700':
                    true,
                  'bg-yellow-300 text-white': sidebarTab === 'datasets',
                })}
              >
                2
              </div>
            </div>
            <p>Datasets</p>
          </button>
          <div className="mt-auto flex flex-col items-center space-y-2">
            <HelpCircle className="text-yellow-50" size={24} strokeWidth={1} />
            <p className="text-base">Help</p>
          </div>
        </ul>
      </div>
    </div>
  );
}

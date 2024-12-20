'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft, Share as Download, X } from 'lucide-react';

import Share from '@/containers/share';

import { Button } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Project, ProjectProjectIndicatorFields } from '@/types/generated/strapi.schemas';

const HeaderControls = ({
  data,
  indicators,
  downloadCSVProjectData,
}: {
  data: Project;
  indicators: ProjectProjectIndicatorFields;
  downloadCSVProjectData: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="absolute top-0 z-20 flex w-full justify-between p-6">
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
              <Button variant="secondary" className="rounded-full" onClick={downloadCSVProjectData}>
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
  );
};

export default HeaderControls;

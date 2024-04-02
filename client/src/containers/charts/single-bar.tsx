import { formatCompactNumber } from '@/lib/utils/formats';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function SingleBar({
  data,
}: {
  data: { total_funding: number; afoco_funding: number; national_funding: number };
}) {
  return (
    data && (
      <>
        <p className="py-4 text-3xl font-extrabold">
          {formatCompactNumber(data.total_funding || 0)}
        </p>
        <div className="flex h-10 w-full rounded-[4px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-full cursor-pointer bg-[#70CCB0]"
                style={{
                  width: `${(data.afoco_funding * 100) / data.total_funding}%`,
                }}
              />
            </TooltipTrigger>

            <TooltipContent side="top" align="end">
              <div className="flex flex-col items-center p-2 text-base">
                <p>{formatCompactNumber(data.afoco_funding || 0)}</p>
                <p>{((data.afoco_funding * 100) / data.total_funding).toFixed()}%</p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-full cursor-pointer bg-[#FFCC73]"
                style={{
                  width: `${(data.national_funding * 100) / data.total_funding}%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              <div className="flex flex-col items-center p-2 text-base">
                <p>{formatCompactNumber(data.national_funding || 0)}</p>
                <p>{((data.national_funding * 100) / data.total_funding).toFixed()}%</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-2 flex w-full items-center justify-between text-xs text-gray-500">
          <p>0</p>
          <p>20</p>
          <p>40</p>
          <p>60</p>
          <p>80</p>
          <p>100</p>
        </div>
        <div className="mb-5 mt-4 flex flex-col space-y-2 text-sm">
          <div className="flex items-center space-x-1.5">
            <div className="flex h-3 w-3 rounded-full bg-[#70CCB0]" />
            <p className="">AFoCO Funding</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="flex h-3 w-3 rounded-full bg-[#FFCC73]" />
            <p className="">National Contributions</p>
          </div>
        </div>
      </>
    )
  );
}

import { formatCompactNumber } from '@/lib/utils/formats';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function SingleBar({
  data,
}: {
  data: {
    unit: string;
    value: {
      total_funding: number;
      afoco_funding: number;
      national_funding: number;
    };
  };
}) {
  return (
    data && (
      <>
        <p className="py-4 text-3xl font-extrabold">
          {formatCompactNumber(data['value'].total_funding || 0)}
        </p>

        <div className="flex h-10 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-full cursor-pointer rounded-bl-[4px] rounded-tl-[4px] bg-[#70CCB0] hover:border-2 hover:border-[#D48D00]"
                style={{
                  width: `${(data['value'].afoco_funding * 100) / data['value'].total_funding}%`,
                }}
              />
            </TooltipTrigger>

            <TooltipContent side="top" align="end">
              <div className="flex flex-col items-center p-2 text-base">
                <p>{formatCompactNumber(data['value'].afoco_funding || 0)}</p>
                <p>
                  {((data['value'].afoco_funding * 100) / data['value'].total_funding).toFixed()}%
                </p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-full cursor-pointer rounded-br-[4px] rounded-tr-[4px] bg-[#FFCC73] hover:border-2 hover:border-[#D48D00]"
                style={{
                  width: `${(data['value'].national_funding * 100) / data['value'].total_funding}%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              <div className="flex flex-col items-center p-2 text-base">
                <p>{formatCompactNumber(data['value'].national_funding || 0)}</p>
                <p>
                  {((data['value'].national_funding * 100) / data['value'].total_funding).toFixed()}
                  %
                </p>
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

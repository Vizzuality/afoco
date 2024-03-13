import { cn } from '@/lib/classnames';

export default function BubbleChartComponent({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-fit text-2xl font-bold text-white">
        {data.map((entry, index) => (
          <div
            key={index}
            className={cn({
              'flex  items-center justify-center rounded-full': true,
              'bg-[#ECAA00]': entry.name === 'Female',
              'absolute right-0 top-0 -translate-y-1/4 translate-x-1/2 border-4 border-white bg-[#70CCB0]':
                entry.name === 'Male',
            })}
            style={{
              height: 40 + entry.value * 1.3,
              width: 40 + entry.value * 1.3,
            }}
          >
            <p>{entry.value}%</p>
          </div>
        ))}
        <div className="mt-3 flex space-x-6">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs font-normal text-black">
              <div
                className={cn({
                  'h-3 w-3 rounded-full': true,
                  'bg-[#ECAA00]': entry.name === 'Female',
                  'bg-[#70CCB0]': entry.name === 'Male',
                })}
              />
              <p>{entry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { LayerSettings } from '@/types/layers';

import LegendSettings from '@/containers/legend-settings';

const LegendItems = {
  'No degradation': '#D1D5DB',
  'Low degradation': '#FFCC73',
  'Medium degradation': '#D48D00',
  'High degradation': '#E23600',
};

export default function Legend({ settings }: { settings: LayerSettings }) {
  return (
    <div className="w-full text-xs">
      <div className="flex w-full items-center justify-between">
        <p className="capitalize">Land Degradation</p>
        <LegendSettings settings={settings} />
      </div>
      <div className="flex flex-col py-2">
        {Object.entries(LegendItems).map((item) => (
          <div key={item[0]} className="flex space-x-2">
            <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item[1] }} />
            <p>{item[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

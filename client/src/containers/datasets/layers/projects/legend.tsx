import { LayerSettings } from '@/types/layers';

import LegendSettings from '@/containers/legend-settings';

export default function Legend({ settings }: { settings: LayerSettings }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <p className="text-xs capitalize">{settings.id}</p>
      </div>
      <LegendSettings settings={settings} />
    </div>
  );
}

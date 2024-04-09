import { useGetLayersId } from '@/types/generated/layer';
import { LayerSettings } from '@/types/layers';

import LegendSettings from '@/containers/legend-settings';

export default function Legend({ settings }: { settings: LayerSettings }) {
  const { data } = useGetLayersId(Number(settings.id));

  if (!data?.data?.attributes) return null;

  const { name } = data.data.attributes;

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-full items-center space-x-2">
        <div className="h-3 w-3 rounded-sm bg-[#dc6c9a]" />
        <p className="text-xs capitalize">{name}</p>
      </div>
      <LegendSettings settings={settings} />
    </div>
  );
}

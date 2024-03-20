'use-client';

import type { LayerSettings } from '@/types/layers';

import { LEGENDS } from '@/containers/datasets/layers';

const MapLegendItem = ({ settings }: { settings: LayerSettings }) => {
  const { id } = settings;
  const LegendDetailComponent = LEGENDS[id];

  return (
    <div
      key={id}
      className="shadow-legend flex w-full items-center justify-between rounded bg-white px-4 py-2"
      id={id}
    >
      {LegendDetailComponent && <LegendDetailComponent settings={settings} />}
    </div>
  );
};

export default MapLegendItem;

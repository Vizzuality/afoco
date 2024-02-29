import { useCallback } from 'react';

import { useSyncBasemap } from '@/hooks/datasets/sync-query';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Roads = () => {
  const [mapSettings, setMapSettings] = useSyncBasemap();
  const { roads } = mapSettings || null;

  const handleChange = useCallback(
    (v: boolean) => {
      setMapSettings((prev) => ({
        ...prev,
        roads: v,
      }));
    },
    [setMapSettings]
  );

  return (
    <div className="group flex grow items-center space-x-2" data-cy="map-settings-roads-switcher">
      <Switch checked={!!roads} onCheckedChange={handleChange} />

      <Label className="text-sm leading-5" htmlFor="roads-checkbox">
        Roads
      </Label>
    </div>
  );
};

export default Roads;

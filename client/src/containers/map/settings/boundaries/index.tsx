import { useCallback } from 'react';

import { useSyncBasemap } from '@/hooks/datasets/sync-query';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Boundaries = () => {
  const [mapSettings, setMapSettings] = useSyncBasemap();
  const { boundaries } = mapSettings || null;

  const handleChange = useCallback(
    (v: boolean) => {
      setMapSettings((prev) => ({
        ...prev,
        boundaries: v,
      }));
    },
    [setMapSettings]
  );

  return (
    <div
      className="group flex grow items-center space-x-2"
      data-cy="map-settings-boundaries-switcher"
    >
      <Switch checked={!!boundaries} onCheckedChange={handleChange} />

      <Label className="text-sm leading-5" htmlFor="boundaries-checkbox">
        Boundaries
      </Label>
    </div>
  );
};

export default Boundaries;

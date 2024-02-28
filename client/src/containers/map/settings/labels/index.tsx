import { useCallback } from 'react';

import { useSyncBasemap } from '@/hooks/datasets/sync-query';

import { LABELS } from '@/constants/basemaps';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Labels = () => {
  const [mapSettings, setMapSettings] = useSyncBasemap();
  const { labels } = mapSettings;

  const handleChange = useCallback(
    (v: string) => {
      setMapSettings((prev) => ({
        ...prev,
        labels: v,
      }));
    },
    [setMapSettings]
  );

  return (
    <RadioGroup
      value={labels}
      onValueChange={handleChange}
      className="flex justify-between space-x-4"
    >
      {LABELS.map((l) => (
        <div key={l.slug} className="group flex cursor-pointer items-center space-x-2">
          <RadioGroupItem value={l.slug} id={l.slug} />
          <Label className="cursor-pointer text-sm font-light leading-5" htmlFor={l.slug}>
            {l.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default Labels;

import { X } from 'lucide-react';

import Basemaps from './basemaps';
import Boundaries from './boundaries';
import Labels from './labels';
import Roads from './roads';

const SettingsHeading = ({ children }: { children: string }) => {
  return <h3 className="text-sm font-extrabold leading-5">{children}</h3>;
};

const MapSettings = ({ onClose }: { onClose: () => void }) => {
  return (
    <div>
      <div className="flex justify-between px-6 py-4">
        <h3 className="text-xl font-semibold leading-7 text-green-900">Map settings</h3>
        <button type="button" aria-label="close-settings" onClick={onClose}>
          <X className="h-4 w-4 text-yellow-400" />
        </button>
      </div>
      <div className="h-0.5 bg-gray-100" />
      <div className="p-6">
        <div className="space-y-3">
          <SettingsHeading>Types</SettingsHeading>
          <Basemaps />
        </div>
        <div className="space-y-3">
          <SettingsHeading>Labels</SettingsHeading>
          <Labels />
        </div>
        <div className="space-y-3">
          <SettingsHeading>Layers</SettingsHeading>

          <div className="space-y-2 divide-y">
            <Boundaries />
            <div className="pt-2">
              <Roads />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSettings;

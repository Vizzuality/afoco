import { FC } from 'react';

export const LandDegradationInfo: FC = () => (
  <div className="space-y-4 px-6 text-sm text-yellow-900">
    <p className="font-light">
      This is a map layer obtained after overlying multiple composition maps of soil type,
      vegetation, drought index, fertility decline, DEM, rainfall, slope, slope length, farming
      coefficient etc. The component spatial data were the last updated available spatial data of
      each province, so the number of data years were not similar.
    </p>
  </div>
);

export default LandDegradationInfo;

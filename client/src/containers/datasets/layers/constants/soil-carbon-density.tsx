import { FC } from 'react';

export const SoilCarbonDensityInfo: FC = () => (
  <div className="space-y-4 px-6 text-sm text-yellow-900">
    <p className="font-light">Identifies organic carbon density in the topsoil (0-30 cm depth).</p>
    <div className="flex space-x-4">
      <span className="font-medium">Citation:</span>
      <p className="font-light">
        Sanderman J, Hengl T, Fiske G et al. (2018) A global map of mangrove forest soil carbon at
        30 m spatial resolution.{' '}
        <a href="http://doi.org/10.1088/1748-9326/aabe1c" rel="noopener noreferrer" target="_blank">
          {' '}
          Environmental Research Letters 13: 055002.
        </a>
      </p>
    </div>
    <div className="flex space-x-4">
      <span className="font-medium">Source:</span>
      <a
        href="https://gfw.global/3rQ6OGW"
        rel="noopener noreferrer"
        target="_blank"
        className="text-yellow-400 underline"
      >
        {' '}
        Global Forest Watch.
      </a>
    </div>
    <div className="flex space-x-4">
      <span className="font-medium">License:</span>
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        rel="noopener noreferrer"
        target="_blank"
        className="text-yellow-400 underline"
      >
        {' '}
        CC BY 4.0.
      </a>
    </div>
  </div>
);

export default SoilCarbonDensityInfo;

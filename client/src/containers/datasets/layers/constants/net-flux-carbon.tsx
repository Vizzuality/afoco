import { FC } from 'react';

export const NetForestCarbonFluxInfo: FC = () => (
  <div className="space-y-4 px-6 text-sm text-yellow-900">
    <p className="font-light">
      Displays the net loss of forest ecosystem carbon, calculated as the difference between forest
      carbon emissions from stand-replacing forest disturbances and carbon removals from forest
      growth.
    </p>
    <div className="flex space-x-4">
      <span className="font-medium">Citation:</span>
      <p className="font-light">
        Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo,
        M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta,
        S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first
        century forest carbon fluxes.{' '}
        <a
          href="https://doi.org/10.1038/s41558-020-00976-6"
          rel="noopener noreferrer"
          target="_blank"
        >
          {' '}
          Nature Climate Change.
        </a>
      </p>
    </div>
    <div className="flex space-x-4">
      <span className="font-medium">Source:</span>
      <a
        href="https://gfw.global/3DtjK8u"
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

export default NetForestCarbonFluxInfo;

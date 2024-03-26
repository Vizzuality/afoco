import { FC } from 'react';

export const BiomassDensityInfo: FC = () => {
  <div>
    <h3 className="px-6 pt-4 text-xl font-medium text-green-900">
      Aboveground live woody biomass density
    </h3>
    <p>Shows aboveground live woody biomass density.</p>
    <span>Citation:</span>
    <p>
      Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C.
      Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S.
      Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century
      forest carbon fluxes.{' '}
      <a
        href="https://doi.org/10.1038/s41558-020-00976-6"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' '}
        Nature Climate Change.
      </a>
    </p>
    <span>Source</span>
    <a href="https://gfw.global/3QbgJkN" rel="noopener noreferrer" target="_blank">
      {' '}
      Global Forest Watch.
    </a>
    <span>License:</span>
    <a
      href="https://creativecommons.org/licenses/by/4.0/"
      rel="noopener noreferrer"
      target="_blank"
    >
      {' '}
      CC BY 4.0.
    </a>
  </div>;
};

export default BiomassDensityInfo;

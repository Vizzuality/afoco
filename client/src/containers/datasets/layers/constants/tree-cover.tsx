import { FC } from 'react';

export const TreeCoverInfo: FC = () => (
  <div className="space-y-4 px-6 text-sm text-yellow-900">
    <p className="font-light">Identifies areas of tree cover.</p>
    <div className="flex space-x-4">
      <span className="font-medium">Citation:</span>
      <p className="font-light">
        Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau,
        S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O.
        Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest
        Cover Change.”{' '}
        <a href="https://doi.org/10.1126/science.1244693" rel="noopener noreferrer" target="_blank">
          {' '}
          Science 342 (15 November): 850–53.
        </a>
      </p>
    </div>
    <div className="flex space-x-4">
      <span className="font-medium">Source:</span>
      <a
        href="https://gfw.global/2MoEQxq"
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

export default TreeCoverInfo;

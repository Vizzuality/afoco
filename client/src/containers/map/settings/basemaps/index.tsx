import { BASEMAPS } from '@/constants/basemaps';

import BasemapItem from './item';

const Basemaps = () => {
  return (
    <ul className="flex justify-start space-x-6">
      {BASEMAPS.map((b) => (
        <li key={b.value}>
          <BasemapItem {...b} />
        </li>
      ))}
    </ul>
  );
};

export default Basemaps;

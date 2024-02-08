import AREA_SVG from '@/svgs/dashboard/planted-area.svg';
import SEEDS_SVG from '@/svgs/dashboard/planted-seeds.svg';
import TRAINING_SVG from '@/svgs/dashboard/training-activities.svg';

export const OVERVIEW_RESUME_ITEMS = [
  {
    title: 'Planted area',
    value: '10',
    unit: 'ha',
    icon: AREA_SVG,
  },
  {
    title: 'Planted seeds',
    value: '400',
    unit: null,
    icon: SEEDS_SVG,
  },
  {
    title: 'Training activities',
    value: '3',
    unit: null,
    icon: TRAINING_SVG,
  },
];

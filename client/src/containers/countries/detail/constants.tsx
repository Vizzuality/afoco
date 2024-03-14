import CHECK_SVG from '@/svgs/ui/check-stamp.svg';
import AREA_SVG from '@/svgs/ui/planted-area.svg';
import SEEDS_SVG from '@/svgs/ui/planted-seeds.svg';
import PROJECTS_SVG from '@/svgs/ui/projects.svg';

export const PANEL_OVERVIEW_ITEMS = [
  { title: 'National Forest Area', value: '137Mha', note: '73% of land' },
  { title: 'Net carbon 2001 - 2022 (MtCO₂e/year)', value: '+347', note: 'emission' },
];

export const RESUME_ITEMS = [
  { title: 'Projects', value: '6', unit: null, icon: PROJECTS_SVG },
  {
    title: 'Completed',
    value: '4',
    unit: null,
    icon: CHECK_SVG,
  },
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
];

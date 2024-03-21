import AREA_SVG from '@/svgs/ui/planted-area.svg';
import SEEDS_SVG from '@/svgs/ui/planted-seeds.svg';

export const DASHBOARD_OVERVIEW_RESUME_ITEMS = [
  {
    title: 'Project area',
    value: 'project_site_area',
    unit: 'ha',
    icon: AREA_SVG,
  },
  {
    title: 'Seeds planted',
    value: 'trees_planted_total',
    unit: null,
    icon: SEEDS_SVG,
  },
];

export const totalInterventionArea = [
  { name: 'Plantation area', value: 'area_plantation_total' },
  { name: 'Reforestation', value: 'area_reforested_total' },
  { name: 'Protection', value: 'area_protected_total' },
];

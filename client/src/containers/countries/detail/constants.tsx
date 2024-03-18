import CHECK_SVG from '@/svgs/ui/check-stamp.svg';
import AREA_SVG from '@/svgs/ui/planted-area.svg';
import SEEDS_SVG from '@/svgs/ui/planted-seeds.svg';
import PROJECTS_SVG from '@/svgs/ui/projects.svg';

export const PANEL_OVERVIEW_ITEMS = [
  {
    title: 'National Forest Area',
    value: 'tree_cover_extent_2010_ha',
    unit: 'Mha',
    percentage: 'forest_area_pct',
    note: 'of land)',
  },
  {
    title: 'Net carbon 2001 - 2022 (MtCO₂e/year)',
    value: 'net_flux_co2e_year',
    note: '(emission)',
  },
];

export const RESUME_ITEMS = [
  { title: 'Projects', value: 'projects_count', unit: null, icon: PROJECTS_SVG },
  {
    title: 'Completed',
    value: 'projects_completed',
    unit: null,
    icon: CHECK_SVG,
  },
  {
    title: 'Planted area',
    value: 'area_plantation_total',
    unit: 'ha',
    icon: AREA_SVG,
  },
  {
    title: 'Trees planted',
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

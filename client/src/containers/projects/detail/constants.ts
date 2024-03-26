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

export const COLUMNS = [
  'name',
  'project_code',
  'description',
  'short_description',
  'status',
  'countries',
  'duration',
  'donors',
  'area_plantation_total',
  'area_protected_total',
  'area_reforested_total',
  'beneficiaries',
  'beneficiaries_total',
  'intervention_area_total',
  'intervention_types',
  'jobs',
  'jobs_total',
  'project_funding',
  'project_site_area',
  'trees_planted_total',
];

export const CSV_COLUMNS_ORDER = {
  name: 1,
  project_code: 2,
  description: 3,
  short_description: 4,
  status: 5,
  countries: 6,
  duration: 7,
  donors: 8,
  area_plantation_total: 9,
  area_protected_total: 10,
  area_reforested_total: 11,
  beneficiaries: 12,
  beneficiaries_total: 13,
  intervention_area_total: 14,
  intervention_types: 15,
  jobs: 16,
  jobs_total: 17,
  project_funding: 18,
  project_site_area: 19,
  trees_planted_total: 20,
};

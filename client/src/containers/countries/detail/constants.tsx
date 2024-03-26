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

export const usefulLinks = [
  {
    title: 'Country Information Hub',
    description:
      'Archive of forestry and forestry-related laws, strategies, plans and policies in each Party.',
    link: 'country_information_link',
  },
  {
    title: 'Global forest Watch country dashboard',
    description:
      'Explore interactive maps and charts that summarise key statistics about the Indonesia’s forest.',
    link: 'gfw_link',
  },
];

export const COLUMNS = [
  'name',
  'iso',
  'description',
  'short_description',
  'gfw_link',
  'country_information_link',
  'area_plantation_total',
  'area_protected_total',
  'area_reforested_total',
  'forest_area_pct',
  'intervention_area_total',
  'jobs',
  'jobs_total',
  'net_flux_co2e_year',
  'production_ntfp_total',
  'project_site_area',
  'projects_completed',
  'projects_count',
  'tree_cover_extent_2010_ha',
  'trees_planted_total',
  'beneficiaries',
  'beneficiaries_total',
  'country_funding',
  'ntfp',
];

export const CSV_COLUMNS_ORDER = {
  name: 1,
  iso: 2,
  description: 3,
  short_description: 4,
  gfw_link: 5,
  country_information_link: 6,
  area_plantation_total: 7,
  area_protected_total: 8,
  area_reforested_total: 9,
  forest_area_pct: 10,
  intervention_area_total: 11,
  jobs: 12,
  jobs_total: 13,
  net_flux_co2e_year: 14,
  production_ntfp_total: 15,
  project_site_area: 16,
  projects_completed: 17,
  projects_count: 18,
  tree_cover_extent_2010_ha: 19,
  trees_planted_total: 20,
  beneficiaries: 21,
  beneficiaries_total: 22,
  country_funding: 23,
  ntfp: 24,
};

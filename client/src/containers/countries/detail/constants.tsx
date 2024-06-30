import CHECK_SVG from '@/svgs/ui/check-stamp.svg';
import AREA_SVG from '@/svgs/ui/planted-area.svg';
import SEEDS_SVG from '@/svgs/ui/planted-seeds.svg';
import PROJECTS_SVG from '@/svgs/ui/projects.svg';

export const PANEL_OVERVIEW_ITEMS = [
  {
    title: 'National Forest Area',
    value: 'tree_cover_extent_2010_ha',
    percentage: 'forest_area_pct',
    note: 'of land)',
  },
  {
    title: 'Net carbon 2001 - 2022',
    value: 'net_flux_co2e_year',
    note: '(emission)',
  },
];

export const RESUME_ITEMS = [
  { title: 'Projects', value: 'projects_count', unit: null, icon: PROJECTS_SVG },
  {
    title: 'Completed',
    value: 'projects_completed',
    icon: CHECK_SVG,
  },
  {
    title: 'Planted area',
    value: 'area_plantation_total',
    icon: AREA_SVG,
  },
  {
    title: 'Trees planted',
    value: 'trees_planted_total',
    icon: SEEDS_SVG,
  },
];

export const totalInterventionArea = [
  { name: 'Plantation area', value: 'area_plantation_total' },
  { name: 'Reforestation', value: 'area_reforested_total' },
  { name: 'Protection', value: 'area_protected_total' },
];

export const usefulLinksCountriesList = [
  {
    title: 'AFoCO publications',
    description: '',
    link: 'https://afocosec.org/knowledge/publications',
  },
  {
    title: 'Country Information Hub',
    // description:
    //   'Archive of forestry and forestry-related laws, strategies, plans and policies in each Party.',
    link: 'https://afocosec.org/knowledge/country-information-hub/',
  },
];

export const usefulLinksCountry = [
  {
    title: 'Country Information Hub',
    // description:
    //   'Archive of forestry and forestry-related laws, strategies, plans and policies in each Party.',
    link: 'country_information_link',
  },
  {
    title: 'Global Forest Watch Country Dashboard',
    // description:
    //   'Explore interactive maps and charts that summarise key statistics about the Indonesia’s forest.',
    link: 'gfw_link',
  },
  {
    title: 'AFoCO Projects and Programs',
    link: 'https://afocosec.org/programs-projects/projects/',
  },
];

export const COLUMNS = [
  'name',
  'iso',
  'description',
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
  gfw_link: 4,
  country_information_link: 5,
  area_plantation_total: 6,
  area_protected_total: 7,
  area_reforested_total: 8,
  forest_area_pct: 9,
  intervention_area_total: 10,
  jobs: 11,
  jobs_total: 12,
  net_flux_co2e_year: 13,
  production_ntfp_total: 14,
  project_site_area: 15,
  projects_completed: 16,
  projects_count: 17,
  tree_cover_extent_2010_ha: 18,
  trees_planted_total: 19,
  beneficiaries: 20,
  beneficiaries_total: 21,
  country_funding: 22,
  ntfp: 23,
};

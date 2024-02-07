import COUNTRIES_SVG from '@/svgs/sidebar/countries.svg';
import DATASETS_SVG from '@/svgs/sidebar/datasets.svg';
import PROJECTS_SVG from '@/svgs/sidebar/projects.svg';

export type SidebarTab = 'projects' | 'countries' | 'datasets';

export const TABS = [
  { name: 'projects', icon: PROJECTS_SVG },
  { name: 'countries', icon: COUNTRIES_SVG },
  { name: 'datasets', icon: DATASETS_SVG },
];

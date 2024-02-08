import COUNTRIES_SVG from '@/svgs/sidebar/countries.svg';
import DATASETS_SVG from '@/svgs/sidebar/datasets.svg';
import PROJECTS_SVG from '@/svgs/sidebar/projects.svg';

export type SidebarTab = 'projects' | 'countries' | 'datasets';

export const TABS = [
  { name: 'projects', icon: PROJECTS_SVG, href: '/projects' },
  { name: 'countries', icon: COUNTRIES_SVG, href: '/countries' },
  { name: 'datasets', icon: DATASETS_SVG, href: '/datasets' },
];

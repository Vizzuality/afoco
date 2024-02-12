import COUNTRIES_SELECTED_SVG from '@/svgs/sidebar/countries-selected.svg';
import COUNTRIES_SVG from '@/svgs/sidebar/countries.svg';
import DATASETS_SELECTED_SVG from '@/svgs/sidebar/datasets-selected.svg';
import DATASETS_SVG from '@/svgs/sidebar/datasets.svg';
import PROJECTS_SELECTED_SVG from '@/svgs/sidebar/projects-selected.svg';
import PROJECTS_SVG from '@/svgs/sidebar/projects.svg';

export type SidebarTab = 'projects' | 'countries' | 'datasets';

export const TABS = [
  {
    name: 'projects',
    icon: { default: PROJECTS_SVG, selected: PROJECTS_SELECTED_SVG },
    href: '/projects',
  },
  {
    name: 'countries',
    icon: {
      default: COUNTRIES_SVG,
      selected: COUNTRIES_SELECTED_SVG,
    },
    href: '/countries',
  },
  {
    name: 'datasets',
    icon: { default: DATASETS_SVG, selected: DATASETS_SELECTED_SVG },
    href: '/datasets',
  },
];

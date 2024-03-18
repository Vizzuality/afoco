import AREA_SVG from '@/svgs/ui/planted-area.svg';
import SEEDS_SVG from '@/svgs/ui/planted-seeds.svg';

export const PANEL_OVERVIEW_ITEMS = [
  { title: 'Status', value: 'Ongoing' },
  { title: 'Priority Areas', value: 'Climate change adaptation' },
  {
    title: 'Location',
    value: 'West Nousa, Indonesia',
    items: [
      {
        title: 'West Java, Indonesia',
      },
      {
        title: 'East Kalimantan, Indonesia',
      },
      {
        title: 'Central Sulawesi, Indonesia',
      },
    ],
  },
  { title: 'Duration', value: '2021-2024' },
  { title: 'Donors', value: 'Korea Forest Service' },
  { title: 'Investment', value: 'USD 800K' },
];

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

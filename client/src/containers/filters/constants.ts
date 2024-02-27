export const INTERVENTION_TYPES = [
  { id: 'agroforestry', label: 'Agroforestry' },
  { id: 'conservation-and-protection', label: 'Conservation & Protection' },
  { id: 'livelihood-improvement', label: 'Livelihood Improvement' },
  { id: 'mangrove-restoration', label: 'Mangrove Restoration' },
  { id: 'peatland-restoration', label: 'Peatland Restoration' },
  { id: 'restoration-and-revegetation', label: 'Restoration & Revegetation' },
];

export const CATEGORIES_FILTERS_DICTIONARY: { [key: string]: string } = {
  intervention: 'Intervention type',
  country: 'Country',
  area_restored: 'Restored area',
  area_protected: 'Protected area',
  area_plantation: 'Plantation area',
};

export const AREAS = [
  {
    id: '<200',
    label: '<200',
  },
  {
    id: '200-500',
    label: '200-500',
  },
  {
    id: '>500',
    label: '>500',
  },
];

export const PROJECTS = [
  {
    value: '1',
    label:
      'Conservation and development of forest ecosystems biodiversity resources at Cat Tien National Park',
  },
  {
    value: '2',
    label:
      'Innovative Solutions for Climate Change and Biodiversity Landscape Strategy to Support SDGs in Indonesia',
  },
];

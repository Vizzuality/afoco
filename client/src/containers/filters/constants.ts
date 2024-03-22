export const INTERVENTION_TYPES = [
  { id: 'climate-change-adaptation', label: 'Climate change adaptation' },
  { id: 'livelihood-improvement', label: 'Livelihood improvement' },
  { id: 'forest-disaster-management', label: 'Forest disaster management' },
  { id: 'strengthening-institution-capabilities', label: 'Strengthening institution capabilities' },
  { id: 'restoration-and-reforestation', label: 'Restoration and reforestation' },
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

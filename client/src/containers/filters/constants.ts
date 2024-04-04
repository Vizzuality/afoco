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

export const FILTERS_INFO = {
  intervention:
    'The project category its aims to support for forest management within each Member Country.',
  country: 'AFoCO Member Country.',
  area_restored:
    'The dimensions of the implementation for restored or reforested area, including total conservation and plantation area, consistent with the outline in the project proposal.',
  area_protected:
    'The dimensions of the implementation for conservation and protection area consistent with the specifications detailed in the project proposal.',
  area_plantation:
    'The dimensions of the implementation for plantation area consistent with the specifications detailed in the project proposal.',
};

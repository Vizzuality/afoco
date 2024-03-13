export type FiltersType =
  | 'intervention'
  | 'country'
  | 'area_restored'
  | 'area_protected'
  | 'area_plantation';

type FilterValues = string | string[] | undefined;

type FilterSettings = {
  [key in FiltersType]?: FilterValues;
};

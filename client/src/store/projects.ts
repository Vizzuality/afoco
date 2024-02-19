import { atom } from 'jotai';

type FiltersSettings = {
  intervention?: string[];
  country?: string;
  area_restored?: string[];
  area_protected?: string[];
  area_plantation?: string[];
};

export const filtersAtom = atom<FiltersSettings>({});

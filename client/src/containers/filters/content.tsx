'use client';

import { useCallback } from 'react';

import { ChevronDown } from 'lucide-react';

import { useGetCountries } from '@/types/generated/country';

import { useSyncFilters } from '@/hooks/datasets/sync-query';

import type { FilterValues, FiltersType } from '@/containers/filters/types';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';

import { AREAS, INTERVENTION_TYPES } from './constants';

const FiltersCheckbox = ({
  type,
  title,
  options,
}: {
  type: FiltersType;
  title: string;
  options: { id: string; label: string }[];
}) => {
  const [filtersSettings, setFiltersToURL] = useSyncFilters();

  const handleChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const filtersToUpdate: FilterValues = filtersSettings?.[type];

      if (filtersToUpdate === undefined) {
        const update = {
          ...filtersSettings,
          [type]: [e.currentTarget.id],
        };
        setFiltersToURL(update);
      } else {
        const updatedFilters = filtersToUpdate?.includes(e.currentTarget.id)
          ? filtersToUpdate.length &&
            Array.isArray(filtersToUpdate) &&
            filtersToUpdate?.filter((f) => f !== e.currentTarget.id)
          : [e.currentTarget.id, ...filtersToUpdate];
        const update = { ...filtersSettings, [type]: updatedFilters };
        setFiltersToURL(update);
      }
    },
    [filtersSettings, type, setFiltersToURL]
  );

  return (
    <div className="flex flex-col space-y-2">
      <span className="font-extrabold leading-5">{title}</span>
      <div className="flex flex-wrap items-center gap-2 text-gray-900">
        {options.map(({ id, label }) => (
          <div key={id} className="flex items-center space-x-2 pr-2 last:pr-0">
            <Checkbox
              id={id}
              onClick={handleChange}
              checked={filtersSettings?.[type]?.includes(id)}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FiltersContent() {
  const [filtersSettings, setFiltersToURL] = useSyncFilters();

  const { data: countries } = useGetCountries(
    { populate: 'name' },
    {
      query: {
        select: (response) => response?.data && response?.data.map((d) => d?.attributes?.name),
      },
    }
  );

  const handleSingleValueChange = useCallback(
    (e: string) => {
      const update = {
        ...filtersSettings,
        country: e,
      };
      setFiltersToURL(update);
    },
    [setFiltersToURL, filtersSettings]
  );

  return (
    <div className="flex flex-col space-y-6 text-sm">
      <FiltersCheckbox type="intervention" title="Intervention type" options={INTERVENTION_TYPES} />
      <div className="flex flex-col">
        <span className="font-extrabold leading-5">Country</span>

        <Select onValueChange={handleSingleValueChange}>
          <SelectTrigger className="flex h-10 items-center justify-between rounded border border-gray-400 px-4">
            <div>
              <SelectValue placeholder="Select country"> </SelectValue>
              {filtersSettings.country}
            </div>
          </SelectTrigger>
          <SelectContent className="no-scrollbar max-h-96 overflow-y-auto border-none shadow-md">
            {countries &&
              countries.map((country) => (
                <SelectItem key={country} value={country as string} className="cursor-pointer">
                  {country}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <FiltersCheckbox
        type="area_restored"
        title="Area of total restored or reforested area (ha)"
        options={AREAS}
      />
      <FiltersCheckbox
        type="area_protected"
        title="Area of total conservation or protection area"
        options={AREAS}
      />
      <FiltersCheckbox type="area_plantation" title="Area of total plantation" options={AREAS} />
    </div>
  );
}

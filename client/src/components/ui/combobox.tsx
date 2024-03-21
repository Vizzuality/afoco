'use client';

import { useState } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/classnames';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Search from '@/components/ui/search';

export function Combobox({
  placeholder = 'Search',
  options,
  onClick,
}: {
  icon?: boolean;
  placeholder: string;
  options: Record<string, string>[];
  onClick?: (e: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const selectedOptionLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Search
          value={value}
          setValue={setValue}
          aria-expanded={open}
          selectedOptionLabel={selectedOptionLabel}
          className="h-10 flex-1 items-center justify-between rounded-md border-none"
        />
      </PopoverTrigger>
      <PopoverContent className="popover-menu-content space-y-2 bg-white p-0 text-gray-900">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(option.value);
                  setOpen(false);
                  if (onClick) {
                    onClick(currentValue);
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { useState } from 'react';

import { Check, Search } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function Combobox({
  icon,
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
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="h-10 w-full flex-1 items-center justify-between rounded-md border-none bg-gray-100"
        >
          <div className="flex h-full w-full shrink-0 items-center space-x-2">
            {icon && <Search size={20} className="" />}
            <span
              className={cn({
                'inline-block w-full flex-auto cursor-pointer justify-center truncate text-start align-middle text-xs text-gray-500':
                  true,
                'text-gray-900': selectedOptionLabel,
              })}
            >
              {value ? selectedOptionLabel : placeholder}
            </span>
          </div>
        </Button>
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

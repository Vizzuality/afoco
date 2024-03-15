import { FC, useRef, ChangeEvent, useCallback } from 'react';

import { X } from 'lucide-react';
import { Search as SearchIcon } from 'lucide-react';

import { cn } from '@/lib/classnames';

type SearchProps = {
  placeholder?: string;
  value?: string;
  setValue: (value: string) => void;
  label?: string;
  selectedOptionLabel?: string;
  className?: string;
};

const Search: FC<SearchProps> = ({
  value,
  setValue,
  label = 'Search',
  className,
  selectedOptionLabel,
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const ref = useRef<HTMLInputElement>(null);

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    },
    [setValue]
  );

  return (
    <div
      className={cn('relative flex w-full outline-none focus:border-red-400', {
        ...(!!className && { [className]: !!className }),
      })}
      aria-label="search"
      role="searchbox"
    >
      <SearchIcon
        className={cn({
          'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-yellow-900': true,
        })}
      />
      <div className="w-fit-content ml-8 flex h-full items-center space-x-2">
        <label htmlFor="search">
          <span className="hidden">{label}</span>
        </label>
        <input
          ref={ref}
          placeholder={placeholder}
          type="search"
          id="search"
          aria-label={label}
          onInput={onInput}
          value={value}
          data-testid="search-input"
          className={cn({
            'focus:ring-ring inline-block w-full flex-auto cursor-pointer justify-center truncate bg-gray-100 text-start align-middle text-sm text-gray-500 ring-offset-gray-500 focus:outline-gray-500':
              true,
            'text-gray-900': selectedOptionLabel,
          })}
        />
      </div>

      {value !== '' && (
        <button
          tabIndex={0}
          type="button"
          className="hover:text-secondary-500 relative flex items-center justify-center self-center p-0 text-yellow-700"
          onClick={() => {
            setValue('');
            if (ref.current) {
              ref.current.focus();
            }
          }}
          aria-label="Empty search"
        >
          <X className="absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-yellow-400" />
        </button>
      )}
    </div>
  );
};

export default Search;

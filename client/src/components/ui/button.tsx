import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classnames';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded text-xs font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-400 text-yellow-900 hover:text-yellow-50 hover:bg-yellow-600',
        outline:
          'border border-yellow-400 text-yellow-900 hover:text-yellow-50 hover:bg-yellow-600',
        ghost: 'hover:bg-yellow-100 text-yellow-900',
      },
      size: {
        xs: 'h-6 px-2 py-1',
        small: 'h-8 px-2 py-1',
        base: 'h-10 rounded-lg px-4 py-2 text-base',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'small',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, disabled, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

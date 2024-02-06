import { cn } from '@/lib/classnames';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-green-900', className)} {...props} />;
}

export { Skeleton };

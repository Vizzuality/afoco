import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="mb-24 text-[200px] font-extrabold leading-10 text-green-400">404</h2>
      <h3 className="mb-4 text-[52px]">Page not found</h3>
      <p className="mb-6 text-base font-light">
        It looks like the links is broken or the page has been removed.
      </p>
      <Link href="/projects">
        <Button variant="primary" size="base">
          Go to home page
        </Button>
      </Link>
    </div>
  );
}

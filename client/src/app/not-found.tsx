import Link from 'next/link';

import ErrorContainer from '@/containers/error';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <ErrorContainer
      errorType="404"
      heading="Page not found"
      message="It looks like the links is broken or the page has been removed."
    >
      <Link href="/projects">
        <Button variant="primary" size="base">
          Go to home page
        </Button>
      </Link>
    </ErrorContainer>
  );
}

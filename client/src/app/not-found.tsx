import Link from 'next/link';

import { Button } from '@/components/ui/button';
import ErrorContainer from '@/containers/error';

export default function NotFound() {
  return (
    <ErrorContainer errorType="404" heading="Page not found" message="It looks like the links is broken or the page has been removed.">
      <Link href="/projects">
        <Button variant="primary" size="base">
          Go to home page
        </Button>
      </Link>
    </ErrorContainer>
  );
}

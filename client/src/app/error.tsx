'use client';

import ErrorContainer from '@/containers/error';

export default function ErrorPage() {
  <ErrorContainer errorType="500" heading="Internal server error" message="Something went wrong and we are working on to fix the problem. Please, try again later." />
}

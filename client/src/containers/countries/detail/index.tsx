'use client';

import { useParams } from 'next/navigation';

export default function CountryDetail() {
  const { slug } = useParams();

  return (
    <div className="flex h-screen items-center justify-center text-3xl text-yellow-900">
      Detail of country {slug}
    </div>
  );
}

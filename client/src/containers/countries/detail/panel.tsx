'use client';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

export default function CountryDetailPanel() {
  return (
    <div className="p-6">
      <Link
        href="/countries"
        className="absolute top-6 z-10 flex items-center space-x-3 text-xs text-yellow-900"
      >
        <ArrowLeft className="h-4 w-4 text-yellow-900" />
        <p>Back</p>
      </Link>
      <div className="mt-10 flex space-x-2">
        <Image
          src="/images/countries/placeholder.png"
          alt="Country Flag"
          className="rounded"
          width={40}
          height={32}
        />
        <h2 className="text-xl">Bhutan</h2>
      </div>
      <p className="my-4 text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur. Vel odio tellus egestas et. Tellus et mattis magnis
        sit.
      </p>
    </div>
  );
}

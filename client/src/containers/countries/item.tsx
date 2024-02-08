'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CountryItem() {
  return (
    <Link
      href={'/countries/bhutan'}
      className="flex items-center justify-between space-x-4 rounded-lg border border-gray-100 bg-white py-2 pl-2 pr-4 text-sm text-yellow-900 shadow-sm transition-all duration-300 hover:border-yellow-500"
    >
      <div className="flex items-center space-x-4">
        <Image
          src="/images/countries/placeholder.png"
          alt="Country Flag"
          className="rounded"
          width={40}
          height={32}
        />
        <h3>Bhutan</h3>
      </div>
      <p>
        <span className="font-semibold">32</span> projects
      </p>
    </Link>
  );
}

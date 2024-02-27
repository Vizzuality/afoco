'use client';

import Image from 'next/image';

import ERROR_SVG from '@/svgs/ui/error.svg';

type ErrorTypes = {
  errorType: '404' | '500';
  heading: string;
  message: string;
  children?: React.ReactNode;
};

export default function ErrorContainer({ errorType, heading, message, children }: ErrorTypes) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-6">
      <Image src={ERROR_SVG} alt="error" width={83} height={108} />
      <span className="text-[40px] font-bold text-green-400">{errorType}</span>
      <h2 className="text-[96px]">{heading}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
}

import '@/styles/globals.css';
import '@/styles/mapbox.css';

import '../../../../node_modules/flag-icons/css/flag-icons.min.css';

import dynamic from 'next/dynamic';

import Providers from '@/app/(landing)/layout-providers';

import Sidebar from '@/containers/sidebar';

const Map = dynamic(() => import('@/containers/map'), {
  ssr: false,
});

export const metadata = {
  title: 'AFoCO',
  description: '',
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="relative h-screen w-screen">
        <Sidebar />
        <Map />
        {children}
      </div>
    </Providers>
  );
}

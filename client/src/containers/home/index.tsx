import Map from '@/containers/map';
import Panel from '@/containers/panel';

import Sidebar from '../countries/sidebar';

export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div className="h-screen w-screen">
          <Sidebar />
          <Map />
          <Panel />
        </div>
      </main>
    </>
  );
}

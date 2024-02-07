import Map from '@/containers/home/map';
import Panel from '@/containers/home/panel';

import Sidebar from './sidebar';

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

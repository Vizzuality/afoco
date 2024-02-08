import Map from '@/containers/map';

export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div className="h-screen w-screen">
          <Map />
        </div>
      </main>
    </>
  );
}

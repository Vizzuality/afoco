import Hydrate from '@/lib/react-query/hydrate';

import { prefetchQueries } from './prefetch';

export default async function HomePage() {
  const dehydratedState = await prefetchQueries();

  return (
    <Hydrate state={dehydratedState}>
      <div></div>
    </Hydrate>
  );
}

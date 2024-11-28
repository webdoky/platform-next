import { lazy, Suspense, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch';

import { getAlgoliaIndexName, getAlgoliaClient } from '../../utils/algolia';

import { FocusOuterWrapper, FocusProvider } from './useFocus';

import SearchFallback from './fallback';

const SearchWidgets = lazy(() => import('./widgets'));

const FUTURE = {
  preserveSharedStateOnUnmount: true,
};

export default function Search() {
  const searchClient = useMemo(() => getAlgoliaClient(), []);
  const indexName = useMemo(() => getAlgoliaIndexName(), []);

  return (
    <InstantSearch
      future={FUTURE}
      indexName={indexName}
      searchClient={searchClient}
    >
      <FocusProvider>
        <FocusOuterWrapper className="relative">
          <Suspense fallback={<SearchFallback />}>
            <SearchWidgets />
          </Suspense>
        </FocusOuterWrapper>
      </FocusProvider>
    </InstantSearch>
  );
}

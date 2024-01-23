import { type FC, useMemo, useState } from 'react';
import { InstantSearch } from 'react-instantsearch';

import { getAlgoliaIndexName, getAlgoliaClient } from '../../utils/algolia';
import SearchFocusedContext from './context';

export default function withInstantSearch<T extends Record<string, unknown>>(
  Component: FC<T>
) {
  function WithInstantSearch(props: T) {
    const searchClient = useMemo(() => getAlgoliaClient(), []);
    const indexName = useMemo(() => getAlgoliaIndexName(), []);
    const [isFocused, setIsFocused] = useState(false);
    const searchFocusedValue = useMemo(
      () => ({ isFocused, setIsFocused }),
      [isFocused, setIsFocused]
    );
    return (
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <SearchFocusedContext.Provider value={searchFocusedValue}>
          <Component {...props} />
        </SearchFocusedContext.Provider>
      </InstantSearch>
    );
  }
  WithInstantSearch.displayName = `withInstantSearch(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WithInstantSearch;
}

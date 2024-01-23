import withInstantSearch from './withInstantSearch';

import SearchDummy from './dummy';
import useSearch from './useSearch';

function Search() {
  const { AlgoliaSearch, handleFocus, isFocused, rootReference } = useSearch();
  return (
    <div className="relative" onFocus={handleFocus} ref={rootReference}>
      {typeof AlgoliaSearch === 'function' ? (
        <AlgoliaSearch isFocused={isFocused} />
      ) : (
        <SearchDummy />
      )}
    </div>
  );
}

export default withInstantSearch(Search);

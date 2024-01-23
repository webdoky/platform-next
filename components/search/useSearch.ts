import {
  type FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import SearchFocusedContext from './context';

export default function useSearch() {
  const rootReference = useRef(null);
  const [AlgoliaSearch, setAlgoliaSearch] = useState<FC<{
    isFocused: boolean;
  }> | null>(null);
  const { isFocused, setIsFocused } = useContext(SearchFocusedContext);
  useEffect(() => {
    if (AlgoliaSearch || !isFocused) {
      return;
    }
    import('./algolia-search')
      .then((mod) => {
        setAlgoliaSearch(() => mod.default);
      })
      .catch(console.error);
  }, [AlgoliaSearch, isFocused]);
  const handleOutsideClick = useCallback(
    (event) => {
      if (
        !rootReference.current ||
        !rootReference.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    },
    [setIsFocused]
  );
  useEffect(() => {
    if (isFocused) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, isFocused]);
  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  return { AlgoliaSearch, handleFocus, isFocused, rootReference };
}

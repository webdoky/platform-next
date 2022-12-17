import Fuse from 'fuse.js';
import { SearchIcon } from './icons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import { ChevronRightIcon } from './icons';

interface FuseInterface {
  search: (_query: string) => unknown[];
}

export default function Search() {
  const [searchData, setSearchData] = useState(null);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState<FuseInterface | undefined>();
  const searchInput = useRef<HTMLInputElement>();

  useEffect(() => {
    if (searchData) {
      setSearchIndex(
        new Fuse(searchData, {
          keys: ['slug', 'title', 'path'],
          threshold: 0.25,
        })
      );
    } else {
      fetch('/_data/search-index.json')
        .then((res) => res.json())
        .then(({ data }) => {
          setSearchData(data);
        });
    }
  }, [searchData]);

  useEffect(() => {
    if (searchIndex) {
      const searchResults = searchIndex.search(query).slice(0, 15);
      setResults(searchResults);
    }
  }, [searchIndex, query]);

  const increment = () => {
    if (focusIndex < results.length - 1) {
      setFocusIndex(focusIndex + 1);
    }
  };
  const decrement = () => {
    if (focusIndex >= 0) {
      setFocusIndex(focusIndex - 1);
    }
  };

  const go = () => {
    // Do nothing if we don't have results.
    if (results.length === 0) {
      return;
    }

    let result;

    // If we don't have focus on a result, just navigate to the first one.
    if (focusIndex === -1) {
      result = results[0];
    } else {
      result = results[focusIndex];
    }

    router.push(result.path);

    // Unfocus the input and reset the query.
    searchInput?.current?.blur();
    // this.$refs.input.blur();
    setQuery('');
  };

  const showResult = focused && query.length > 0;

  const keybrControlsHandler = (evt) => {
    if (evt.key === 'ArrowDown') {
      increment();
    }
    if (evt.key === 'ArrowUp') {
      decrement();
    }
    if (evt.key === 'Enter') {
      go();
    }
  };

  return (
    <div className="relative">
      <label className="relative block">
        <span className="sr-only">Пошук у документації</span>
        <div className="absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50">
          <SearchIcon size={1.4} className="text-ui-typo" />
        </div>
        <input
          ref={searchInput}
          value={query}
          type="search"
          className={classNames(
            'block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background',
            showResult && 'rounded-b-none'
          )}
          onKeyDown={keybrControlsHandler}
          onChange={(event) => {
            setFocusIndex(-1);
            setQuery(event.target?.value || '');
          }}
          placeholder="Пошук у документації..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </label>
      {showResult && (
        <div
          className="fixed inset-x-0 z-50 overflow-y-auto border-2 border-t-0 rounded-lg rounded-t-none shadow-lg results bg-ui-background bottom:0 sm:bottom-auto sm:absolute border-ui-sidebar"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          <ul className="px-4 py-2 m-0">
            {results.length === 0 ? (
              <li className="px-2">
                Немає результату для запиту{' '}
                <span className="font-bold">{query}</span>.
              </li>
            ) : (
              results.map((result, index) => (
                <li
                  key={result.path}
                  className={classNames(
                    'border-ui-sidebar',
                    index + 1 !== results.length && 'border-b'
                  )}
                  onMouseEnter={() => setFocusIndex(index)}
                  onMouseDown={() => go()}
                >
                  <Link
                    href={result.path}
                    className={classNames(
                      'block p-2 -mx-2 text-base font-bold rounded-lg no-underline',
                      focusIndex === index
                        ? 'bg-ui-sidebar text-ui-primary'
                        : 'text-ui-typo'
                    )}
                    passHref
                  >
                    <span className="flex items-center">
                      {result.title}
                      <ChevronRightIcon size={1.3} class-name="mx-1" />
                      <span className="font-normal opacity-75">
                        {result.path}
                      </span>
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

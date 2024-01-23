import classNames from 'classnames';
import 'instantsearch.css/themes/satellite.css';
import { useMemo } from 'react';
import {
  Hits,
  type HitsProps,
  Menu,
  PoweredBy,
  RefinementList,
  SearchBox,
  type SearchBoxProps,
} from 'react-instantsearch';

import Hit from './hit';
import NoResults from './noResults';
import NoResultsBoundary from './noResultsBoundary';
import type { Hit as HitType } from './validation';

const SEARCH_BOX_CLASS_NAMES: SearchBoxProps['classNames'] = {
  input:
    'block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background',
  submitIcon:
    'absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50',
};

export default function AlgoliaSearch({ isFocused }: { isFocused: boolean }) {
  const hitsClassNames = useMemo<HitsProps<HitType>['classNames']>(
    () => ({
      item: 'border-ui-sidebar border-b',
      list: 'px-4 py-2 m-0',
    }),
    []
  );
  return (
    <>
      <SearchBox
        classNames={SEARCH_BOX_CLASS_NAMES}
        placeholder="Пошук у документації"
      />
      <div
        className={classNames(
          'fixed inset-x-0 z-50 overflow-y-auto border-2 border-t-0 rounded-lg rounded-t-none shadow-lg results bg-ui-background bottom:0 sm:bottom-auto sm:absolute border-ui-sidebar search-hits',
          { hidden: !isFocused }
        )}
      >
        <PoweredBy
          className={isFocused ? '' : 'hidden'}
          theme={
            document.documentElement.dataset.theme == 'dark' ? 'dark' : 'light'
          }
        />
        <Menu attribute="section" />
        <NoResultsBoundary fallback={<NoResults />}>
          <Hits classNames={hitsClassNames} hitComponent={Hit} />
        </NoResultsBoundary>
      </div>
    </>
  );
}

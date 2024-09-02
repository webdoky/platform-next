import classNames from 'classnames';
import type { MenuItem } from 'instantsearch.js/es/connectors/menu/connectMenu';
import { useMemo } from 'react';
import {
  Hits,
  type HitsProps,
  Menu,
  PoweredBy,
  SearchBox,
  type SearchBoxProps,
  useInstantSearch,
} from 'react-instantsearch';

import useFocus from '../useFocus';

import Hit from './hit';
import NoResults from './noResults';
import NoResultsBoundary from './noResultsBoundary';
import type { Hit as HitType } from './hit/models';

import 'instantsearch.css/themes/satellite.css';

const SEARCH_BOX_CLASS_NAMES: SearchBoxProps['classNames'] = {
  input:
    'block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background',
  submitIcon:
    'absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50',
};

const SECTION_LABELS: Record<string, string> = {
  css: 'CSS',
  glossary: 'Глосарій',
  guide: 'Посібники',
  html: 'HTML',
  javascript: 'JavaScript',
  svg: 'SVG',
};

const PAGE_TYPE_LABELS: Record<string, string> = {
  'css-at-rule': 'Директиви CSS',
  'css-function': 'Функції CSS',
  'css-module': 'Модулі CSS',
  'css-property': 'Властивості CSS',
  'css-pseudo-class': 'Псевдокласи CSS',
  'css-pseudo-element': 'Псевдоелементи CSS',
  'css-selector': 'Селектори CSS',
  'css-shorthand-property': 'Властивості-скорочення CSS',
  'css-type': 'Типи CSS',
  'glossary-definition': 'Визначення глосарія',
  'glossary-disambiguation': 'Уоднозначнення глосарія',
  guide: 'Посібники',
  'javascript-class': 'Класи JavaScript',
  'javascript-constructor': 'Конструктори JavaScript',
  'javascript-instance-method': 'Методи примірників JavaScript',
  'javascript-language-feature': 'Мовні особливості JavaScript',
  'javascript-namespace': 'Простори імен JavaScript',
  'javascript-operator': 'Оператори JavaScript',
  'javascript-statement': 'Інструкції JavaScript',
  'javascript-static-method': 'Статичні методи JavaScript',
  'html-attribute': 'Атрибути HTML',
  'html-attribute-value': 'Значення атрибутів HTML',
  'html-element': 'Елементи HTML',
  'landing-page': 'Цільові сторінки',
};

function transformSectionItems(items: MenuItem[]) {
  return items.map((item) => ({
    ...item,
    label: SECTION_LABELS[item.label] || item.label,
  }));
}

function transformPageTypeItems(items: MenuItem[]) {
  return items.map((item) => ({
    ...item,
    label: PAGE_TYPE_LABELS[item.label] || item.label,
  }));
}

export default function SearchWidgets() {
  const { isFocused } = useFocus();

  const hitsClassNames = useMemo<HitsProps<HitType>['classNames']>(
    () => ({
      item: 'border-ui-sidebar border-b',
      list: 'px-4 py-2 m-0',
    }),
    []
  );

  const {
    indexUiState: { menu: { section } = {} },
  } = useInstantSearch();

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
        <Menu attribute="section" transformItems={transformSectionItems} />
        {section && (
          <Menu
            attribute="page-type"
            className="border-t"
            transformItems={transformPageTypeItems}
          />
        )}
        <NoResultsBoundary fallback={<NoResults />}>
          <Hits classNames={hitsClassNames} hitComponent={Hit} />
        </NoResultsBoundary>
      </div>
    </>
  );
}

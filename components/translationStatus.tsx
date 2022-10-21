import { ContentItem } from '../content/wdContentLoader';
import TranslationStatusSection from './translationStatusSection';
import { useReducer } from 'react';
import TranslationOverallStatusRow from './translationOverallStatusRow';
import SerializedTranslationSection from './_serializedTranslationSection';

const NUMBER_OF_SIGNIFICANT_DIGITS = 2;

interface Params {
  allPopularities: { link: string; popularity: number }[];
  allPages: ContentItem[];
  priorityOnly?: boolean;
}

const filterPages = (pages, data) => {
  const { showNotTranslated, showUpToDate, showTranslated } = data;
  return pages.filter(
    (page) =>
      (showNotTranslated && !page.hasContent) ||
      (showUpToDate && page.hasContent && !page.updatesInOriginalRepo.length) ||
      (showTranslated && page.hasContent && page.updatesInOriginalRepo.length)
  );
};

function reducer(state: FilterSate, action) {
  switch (action.type) {
    case 'toggleNotTranslated':
      return { ...state, showNotTranslated: !state.showNotTranslated };
    case 'toggleUpToDate':
      return { ...state, showUpToDate: !state.showUpToDate };
    case 'toggleTranslated':
      return { ...state, showTranslated: !state.showTranslated };
    default:
      throw new Error();
  }
}

interface FilterSate {
  showNotTranslated: boolean;
  showUpToDate: boolean;
  showTranslated: boolean;
}

export default function TranslationStatus({
  allPopularities,
  allPages,
  priorityOnly = false,
}: Params) {
  const [filterState, dispatch] = useReducer(reducer, {
    showNotTranslated: true,
    showUpToDate: true,
    showTranslated: true,
  });

  const pathToPagesMap = Object.fromEntries(
    allPages.map((page) => [page.path, page])
  );

  const pathToPopularityMap = Object.fromEntries(
    allPopularities.map(({ link, popularity }) => [link, popularity])
  );

  const supportedSections = {
    css: [],
    html: [],
    javascript: [],
    svg: [],
    guide: [],
    glossary: [],
  };

  if (priorityOnly) {
    allPopularities.forEach((entry) => {
      const { link, popularity } = entry;
      const normalizedPopularity = parseFloat(
        popularity.toFixed(NUMBER_OF_SIGNIFICANT_DIGITS)
      );
      if (normalizedPopularity > 0) {
        const page = pathToPagesMap[link];
        if (page && page.section) {
          const { section } = page;
          supportedSections[section].push({
            ...page,
            popularity: normalizedPopularity,
          });
        }
      }
    });
  } else {
    allPages.forEach((page) => {
      const { section, path } = page;
      if (section in supportedSections) {
        supportedSections[section].push({
          ...page,
          popularity: pathToPopularityMap[path] || 0,
        });
      }
    });
  }

  const allSupportedPages = [
    ...supportedSections.css,
    ...supportedSections.html,
    ...supportedSections.javascript,
    ...supportedSections.svg,
    ...supportedSections.guide,
  ];

  return (
    <>
      <div className="wd-table-scroll">
        <table className="table table-bordered w-full doc-status__table">
          <thead>
            <tr>
              <th>Розділ</th>
              <th>Сторінки</th>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={filterState.showTranslated}
                    className="mr-2"
                    onChange={() => dispatch({ type: 'toggleTranslated' })}
                  />
                  З них перекладено
                </label>
              </th>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={filterState.showUpToDate}
                    className="mr-2"
                    onChange={() => dispatch({ type: 'toggleUpToDate' })}
                  />
                  З них актуально
                </label>
              </th>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={filterState.showNotTranslated}
                    className="mr-2"
                    onChange={() => dispatch({ type: 'toggleNotTranslated' })}
                  />
                  Очікує на переклад
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            <TranslationOverallStatusRow
              allPages={supportedSections.css}
              title="CSS"
              anchor="CSS"
            />
            <TranslationOverallStatusRow
              allPages={supportedSections.html}
              title="HTML"
              anchor="HTML"
            />
            <TranslationOverallStatusRow
              allPages={supportedSections.javascript}
              title="JavaScript"
              anchor="JavaScript"
            />
            <TranslationOverallStatusRow
              allPages={supportedSections.svg}
              title="SVG"
              anchor="SVG"
            />
            <TranslationOverallStatusRow
              allPages={supportedSections.guide}
              title="Посібники"
              anchor="Посібники"
            />
            <TranslationOverallStatusRow
              allPages={supportedSections.glossary}
              title="Глосарій"
              anchor="Глосарій"
            />
            <TranslationOverallStatusRow
              allPages={allSupportedPages}
              title="Загалом"
            />
          </tbody>
        </table>
      </div>

      <h2 id="Стан-перекладу-за-розділами">
        <a href="#Стан-перекладу-за-розділами" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        Стан перекладу за розділами
      </h2>
      <h3 id="CSS">
        <a href="#CSS" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        CSS
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.css, filterState)}
          includePopularity={true}
        />
      </div>

      <h3 id="HTML">
        <a href="#HTML" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        HTML
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.html, filterState)}
          includePopularity={true}
        />
      </div>

      <h3 id="JavaScript">
        <a href="#JavaScript" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        JavaScript
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.javascript, filterState)}
          includePopularity={true}
        />
      </div>

      <h3 id="SVG">
        <a href="#SVG" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        SVG
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.svg, filterState)}
          includePopularity={true}
        />
      </div>

      <h3 id="Посібники">
        <a href="#Посібники" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        Посібники
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.guide, filterState)}
          includePopularity={true}
        />
      </div>

      <h3 id="Глосарій">
        <a href="#Глосарій" aria-hidden="true">
          <span className="icon icon-link"></span>
        </a>
        Глосарій
      </h3>
      <div className="wd-table-scroll">
        <TranslationStatusSection
          pages={filterPages(supportedSections.glossary, filterState)}
          includePopularity={true}
        />
      </div>
    </>
  );
}

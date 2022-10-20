import { ContentItem } from '../content/wdContentLoader';

interface Params {
  title?: string;
  anchor?: string;
  allPages: Partial<ContentItem>[];
}

export default function TranslationOverallStatusRow({
  title = '',
  anchor = '',
  allPages,
}: Params) {
  const allPageCount = allPages.length;
  const translatedPageCount = allPages.filter((node) => node.hasContent).length;

  const translatedPagePercent =
    Math.round((translatedPageCount / allPageCount) * 100 * 100) / 100; // toFixed(2)
  const obsoletePages = allPages.filter(
    (node) => node.updatesInOriginalRepo.length
  ).length;

  const translationsUpToDateCount = translatedPageCount - obsoletePages;
  const translationsUpToDatePercent = (
    (translationsUpToDateCount / allPageCount) *
    100
  ).toFixed(2);

  return (
    <tr>
      <td>
        {anchor ? (
          <a href={`#${title}`} className="text-ui-typo">
            {' '}
            {title}{' '}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </td>
      <td>{allPageCount}</td>
      <td className="doc-status--translated">
        {translatedPageCount} ({translatedPagePercent}%)
      </td>
      <td className="doc-status--translated doc-status--up-to-date">
        {translationsUpToDateCount} ({translationsUpToDatePercent}%)
      </td>
      <td className="doc-status--not-translated">
        {allPageCount - translatedPageCount} ({100 - translatedPagePercent}%)
      </td>
    </tr>
  );
}

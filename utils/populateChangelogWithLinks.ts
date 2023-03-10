import escape from 'lodash/escape';
import toLower from 'lodash/toLower';

const CHANGE_REGEXP =
  /((?:Оновлення перекладу)|(?:Переклад))\((\w+)\):<\/strong> (\S+)/gu;

/**
 *
 * @param changelog Changelog HTML
 * @param slugsToPaths Map of page slugs to some of respective pages' data
 * @returns Changelog HTML, filled with links to updated articles
 */
export default function populateChangelogWithLinks(
  changelog: string,
  slugsToPaths: Map<string, { path?: string; title?: string }>
): string {
  return changelog.replaceAll(CHANGE_REGEXP, (_, action, section, slug) => {
    const changedPage = slugsToPaths.get(toLower(slug));
    if (changedPage?.path) {
      return `${action}(${section}):</strong> <a href="${changedPage.path}">${
        changedPage.title ? escape(changedPage.title) : slug
      }</a>`;
    }
    return `${action}(${section}):</strong> ${slug}`;
  });
}

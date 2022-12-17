import Link from 'next/link';
import { ContentItem } from '../content/wdContentLoader';
import { ArrowRightIcon, ArrowLeftIcon } from './icons';

interface Params {
  page: ContentItem;
  pages: Partial<ContentItem>[];
}

const normalizeUrl = (str: string) => {
  if (str.endsWith('/')) {
    return str.slice(0, str.length - 1);
  }
  return str;
};

const maybeAppendIndexUrl = (str: string) => {
  if (str === '/docs') {
    return `${str}/index`;
  }
  return str;
};

export default function NextPrevLinks({ page, pages }: Params) {
  const next =
    pages && !page.next
      ? false
      : pages.find(
          (searchablePage) =>
            maybeAppendIndexUrl(normalizeUrl(searchablePage.path)) ===
            maybeAppendIndexUrl(normalizeUrl(page.next))
        );
  const prev =
    pages && !page.prev
      ? false
      : pages.find(
          (searchablePage) =>
            maybeAppendIndexUrl(normalizeUrl(searchablePage.path)) ===
            maybeAppendIndexUrl(normalizeUrl(page.prev))
        );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {prev && (
          <Link
            href={prev.path}
            className="mb-4 sm:mb-0 flex items-center mr-auto text-ui-primary font-bold px-4 py-2 border border-ui-border rounded-lg hover:bg-ui-primary hover:text-white transition-colors no-underline"
            passHref
          >
            <ArrowLeftIcon className="mr-2" size={1.3} />
            {prev.title}
          </Link>
        )}

        {next && (
          <Link
            href={next.path}
            className="flex items-center ml-auto text-ui-primary font-bold px-4 py-2 border border-ui-border rounded-lg hover:bg-ui-primary hover:text-white transition-colors no-underline"
            passHref
          >
            {next.title}
            <ArrowRightIcon className="ml-2" size={1.3} />
          </Link>
        )}
      </div>
    </div>
  );
}

import classNames from 'classnames';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';

import confirmMdnNavigation from '../utils/confirm-mdn-navigation';

export interface LinkItem {
  path: string;
  hasLocalizedContent?: boolean;
  isCurrent: boolean;
  title: string;
}

interface Params {
  isCurrent: boolean;
  isMissing: boolean;
  page: LinkItem;
}
export default function WdNavItem({ isCurrent, isMissing, page }: Params) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = isMissing
    ? (event) => {
        event.preventDefault();
        confirmMdnNavigation(page.path);
      }
    : null;
  return (
    <Link
      href={page.path}
      className="flex items-center py-1 relative text-ui-typo no-underline"
      onClick={handleClick}
      passHref
    >
      <span
        className={classNames(
          'absolute w-2 h-2 -ml-3 rounded-full opacity-0 bg-ui-primary transition transform scale-0 origin-center',
          {
            'opacity-100 scale-100': isCurrent,
          }
        )}
      ></span>
      {page.title}
    </Link>
  );
}

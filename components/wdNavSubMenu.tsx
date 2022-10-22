import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from './icons';

interface Params {
  expanded: boolean;
  showHeader: boolean;
  children: JSX.Element;
  headerContent: JSX.Element;
}

export default function WdNavSubMenu({
  expanded,
  showHeader,
  headerContent,
  children,
}: Params) {
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>();
  useEffect(() => {
    if (isExpanded === undefined) {
      setIsExpanded(expanded ?? false);
    }
  }, [expanded, isExpanded]);
  return (
    <div>
      {showHeader && (
        <h3
          className="pt-0 mt-0 mb-1 text-sm tracking-tight uppercase border-none hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="inline-block align-middle">
            {isExpanded ? (
              <ChevronDownIcon size={1.5} />
            ) : (
              <ChevronRightIcon size={1.5} />
            )}
          </div>
          {headerContent}
        </h3>
      )}
      <div
        className={classNames('pl-4 overflow-hidden', {
          'max-h-full': isExpanded,
          'max-h-0': !isExpanded,
        })}
      >
        {children}
      </div>
    </div>
  );
}

import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from './icons';

export interface SidebarSection {
  title: string;
  items: {
    path: string;
    title: string;
  }[];
}

export default function Sidebar({
  sections = [],
  currentPage,
}: {
  sections: SidebarSection[];
  currentPage: { path: string };
}) {
  const [expanded, setExpanded] = useState({});
  const sectionHeaderClickHandler = (sectionKey) => {
    setExpanded({
      ...expanded,
      [sectionKey]: expanded[sectionKey] ? undefined : true,
    });
  };
  useEffect(() => {
    const currentSection = sections.find((section) =>
      section.items.some((item) => item.path === currentPage.path)
    );
    if (currentSection) {
      setExpanded({
        [currentSection.title]: true,
      });
    }
  }, [currentPage.path, sections]);
  return (
    <div className="px-4 pt-8 lg:pt-12">
      <h2 className="sr-only">Навігація</h2>

      {sections.map((section, index) => (
        <div
          key={section.title}
          className={classNames(
            'pb-4 mb-4 border-ui-border',
            index < sections.length - 1 ? 'border-b' : null
          )}
        >
          <h3
            className="pt-0 mt-0 mb-1 text-sm tracking-tight uppercase border-none cursor-pointer"
            onClick={() => sectionHeaderClickHandler(section.title)}
          >
            <div className="inline-block align-middle">
              {expanded[section.title] ? (
                <ChevronDownIcon size={1.5} />
              ) : (
                <ChevronRightIcon size={1.5} />
              )}
            </div>
            {section.title}
          </h3>

          <div
            className={classNames(
              'pl-4 overflow-hidden',
              expanded[section.title] ? 'max-h-full' : 'max-h-0'
            )}
          >
            <ul className="max-w-full pl-2 mb-0">
              {section.items.map((page) => (
                <li
                  id={page.path}
                  key={page.path}
                  className={classNames(
                    currentPage.path === page.path && 'text-ui-primary',
                    currentPage.path !== page.path &&
                      'transition transform hover:translate-x-1 hover:text-ui-primary'
                  )}
                >
                  <Link
                    href={page.path}
                    className="flex items-center py-1 font-semibold text-ui-typo no-underline"
                    passHref
                  >
                    <span
                      className={classNames(
                        'absolute w-2 h-2 -ml-3 rounded-full opacity-0 bg-ui-primary transition transform scale-0 origin-center',
                        expanded[section.title] &&
                          currentPage.path === page.path
                          ? 'opacity-100 scale-100'
                          : null
                      )}
                    ></span>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

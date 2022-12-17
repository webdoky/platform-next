import classNames from 'classnames';
import WdNavItem, { LinkItem } from './wdNavItem';
import WdNavSubMenu from './wdNavSubMenu';

interface Params {
  supSection: {
    title: string;
    links: LinkItem[];
    sections: {
      title: string;
      expanded: boolean;
      items: LinkItem[];
    }[];
  };
}

const MISSING_TRANSLATION_MESSAGE =
  'Це посилання веде на сторінку, якої ще не існує. Ймовірно, ми її ще не переклали.';

export default function WdNavMenu({ supSection }: Params) {
  return (
    <div>
      {supSection.title && (
        <h2 className="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none">
          {supSection.title}
        </h2>
      )}
      {supSection.links && supSection.links.length && (
        <ul className="max-w-full pl-2 mb-2">
          {supSection.links.map((link) => (
            <li
              id={link.path}
              key={link.path}
              className={classNames({
                'text-ui-primary': link.isCurrent,
                'transition transform hover:translate-x-1 hover:text-ui-primary':
                  !link.isCurrent,
                'wd-nav-link--not-translated': !link.hasLocalizedContent,
              })}
              title={
                !link.hasLocalizedContent ? MISSING_TRANSLATION_MESSAGE : ''
              }
            >
              <WdNavItem page={link} isCurrent={link.isCurrent} />
            </li>
          ))}
        </ul>
      )}
      {supSection.sections &&
        supSection.sections.map((section, index) => (
          <div
            key={section.title}
            className={classNames('pb-4 mb-4 border-ui-border', {
              'border-b': index < supSection.sections.length - 1,
            })}
          >
            <WdNavSubMenu
              expanded={!!section.expanded}
              showHeader={!!section.title}
              headerContent={<>{section.title}</>}
            >
              <ul className="max-w-full pl-2 mb-0">
                {section.items.map((page) => (
                  <li
                    id={page.path}
                    key={page.path}
                    className={classNames({
                      'text-ui-primary': page.isCurrent,
                      'transition transform hover:translate-x-1 hover:text-ui-primary':
                        !page.isCurrent,
                      'wd-nav-link--not-translated': !page.hasLocalizedContent,
                    })}
                    title={
                      !page.hasLocalizedContent
                        ? MISSING_TRANSLATION_MESSAGE
                        : ''
                    }
                  >
                    <WdNavItem page={page} isCurrent={page.isCurrent} />
                  </li>
                ))}
              </ul>
            </WdNavSubMenu>
          </div>
        ))}
    </div>
  );
}

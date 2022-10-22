import { MacroData, ContentItem } from '../content/wdContentLoader';
import WdNavMenu from './wdNavMenu';

interface Params {
  sidebar: MacroData[];
  currentPage: ContentItem;
}

export default function WdNav({ currentPage, sidebar }: Params) {
  const navigationStructure = JSON.parse(currentPage.macros[0].result || '[]');

  return sidebar.length ? (
    <div className="px-4 pt-8 lg:pt-12">
      <h2 className="sr-only">Навігація</h2>
      {navigationStructure.map((supSection, index) => (
        <div key={`${index}_${supSection.title}`}>
          {!supSection.items && <WdNavMenu supSection={supSection} />}
          {supSection.groupItems && (
            <div className="pt-1">
              <h2 className="text-base tracking-tight mt-2">
                {supSection.title}:
              </h2>
              {supSection.groupItems.map((subGroup, j) => (
                <WdNavMenu
                  supSection={subGroup}
                  key={`${j}_${subGroup.title}`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : null;
}

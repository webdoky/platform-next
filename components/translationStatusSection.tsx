import { ContentItem } from '../content/wdContentLoader';
import TranslationStatusRow from './translationStatusRow';

interface Params {
  pages: Partial<ContentItem>[];
  includePopularity: boolean;
}

export default function TranslationStatusSection({
  pages,
  includePopularity,
}: Params) {
  return (
    <table className="table table-bordered w-full doc-status__table">
      <thead>
        <tr>
          {includePopularity && <th>Рейтинг</th>}
          <th>Сторінка</th>
          <th>Оригінал</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <TranslationStatusRow
            key={page.path}
            page={page}
            includePopularity={includePopularity}
          />
        ))}
      </tbody>
    </table>
  );
}

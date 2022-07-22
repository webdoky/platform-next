import { ContentItem } from '../content/wdContentLoader';

interface Params {
  pages: Partial<ContentItem & { popularity: number }>[];
}

export default function SerializedTranslationSection({ pages }: Params) {
  return pages.map((page) => (
    <>
      {`- [ ] ${page.popularity} – [${page.title}](https://webdoky.org${page.path})`}
      <br />
    </>
  ));
}

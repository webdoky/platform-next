import { promises as fs } from 'fs';
import path from 'path';

const contentCachePath = 'cache';
const mainIndexFile = 'mainIndex.json';
const pageFileName = 'index.json';
const pagesPath = `${contentCachePath}/files`;

export interface HeadingItem {
  depth: number;
  value: string;
  anchor: string;
}

export interface MacroData {
  macro: string;
  result: string;
}

export interface BaselineItem {
  baseline: false | 'high' | 'low';
  baseline_low_date?: string;
  support: Record<string, string>;
}

export interface ContentItem {
  id?: string; // TODO???
  title: string;
  path: string;
  slug: string;
  tags: string[]; // TODO:??
  description: string;
  content: string;
  hasContent: boolean;
  originalPath: string;
  headings: HeadingItem[];
  macros: MacroData[];
  // TODO: type this
  // ...data,
  updatesInOriginalRepo: string[];
  section: string;
  translationLastUpdatedAt?: string;
  browser_compat: unknown; // TODO::
  prev?: string;
  next?: string;
  baseline: BaselineItem;
}

// TODO: merge types
export interface ExtractedSample {
  src: string;
  id: string;
  content: {
    js?: string;
    css?: string;
    html?: string;
  };
}

export interface IndexFileObject {
  index: MainIndexData[];
  liveSamples: ExtractedSample[];
  internalDestinations: string[];
}

export interface MainIndexData {
  slug: string;
  title: string;
  path: string;
  hasContent: boolean;
}

export interface PageData {
  id?: string;
  content: string;
  description: string;
  hasContent: boolean;
  headings: HeadingItem[];
  macros: MacroData[];
  path: string;
  originalPath: string;
  updatesInOriginalRepo: string[];
  section: string;
  translationLastUpdatedAt?: string;
  browser_compat: unknown; // TODO::

  // data fields
  title: string;
  slug: string;
  tags: string[];
  browserCompat: string;
  baseline: BaselineItem;
}

const readIndex = async (): Promise<IndexFileObject> => {
  const file = await fs.readFile(
    path.resolve(contentCachePath, mainIndexFile),
    'utf-8'
  );
  return JSON.parse(file);
};

export const readAllPages = async (fields: (keyof PageData)[]) => {
  const mainIndex = await readIndex();
  const pages: Partial<PageData>[] = [];
  const paths = mainIndex.index.map(({ slug }) => slug);

  await Promise.all(
    paths.map(async (slug, index) => {
      const file = await fs.readFile(
        path.resolve(pagesPath, slug, pageFileName),
        'utf-8'
      );
      const pageData = JSON.parse(file) as PageData;
      const selectedPageData = {};

      fields.forEach((key) => {
        selectedPageData[key] = pageData[key];
      });

      pages[index] = selectedPageData;
    })
  );

  return pages;
};

export const readAllSamples = async () => {
  const mainIndex = await readIndex();

  return mainIndex.liveSamples;
};

export default class WdContentLoader {
  static async getAll(fields: string[] = []): Promise<Partial<ContentItem>[]> {
    const mainIndex = await readIndex();
    const pages: Partial<PageData>[] = [];
    const paths = mainIndex.index.map(({ slug }) => slug);

    await Promise.all(
      paths.map(async (slug, index) => {
        const file = await fs.readFile(
          path.resolve(pagesPath, slug, pageFileName),
          'utf-8'
        );
        const pageData = JSON.parse(file) as PageData;
        const selectedPageData = fields.length ? {} : pageData; // return full object by default

        fields.forEach((key) => {
          selectedPageData[key] = pageData[key];
        });

        pages[index] = selectedPageData;
      })
    );

    return pages;
  }

  static async getBySlug(slug: string): Promise<ContentItem> {
    const file = await fs.readFile(
      path.resolve(pagesPath, slug, pageFileName),
      'utf-8'
    );
    const pageData = JSON.parse(file) as PageData;
    return pageData;
  }
}

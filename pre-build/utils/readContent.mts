import { promises as fs } from 'fs';
import path from 'path';

const contentCachePath = 'cache';
const mainIndexFile = 'mainIndex.json';
const pageFileName = 'index.json';
const pagesPath = `${contentCachePath}/files`;

// TODO: mode these into type definitions in content processor
export interface Heading {
  depth: number;
  value: string;
  anchor: string;
}

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
  content: string;
  description: string;
  hasContent: boolean;
  headings: Heading[];
  path: string;
  originalPath: string;
  updatesInOriginalRepo: string[];
  section: string;
  sourceLastUpdatedAt?: number;
  translationLastUpdatedAt?: string;

  // data fields
  title: string;
  slug: string;
  tags: string[];
  browserCompat: string;
}

export const readIndex = async (): Promise<IndexFileObject> => {
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

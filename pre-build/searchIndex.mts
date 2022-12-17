import matter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { Node, visit } from 'unist-util-visit';
import { readIndex } from './utils/readContent.mjs';

const pathToInternalContent = `docs/`;
const dataOutputDir = 'public/_data';

type MdNode = Node & {
  type: string;
  depth?: number;
  children?: MdNode[];
  value?: string;
};

const changelogProcessor = unified().use(remarkParse);

const trailingIndex = '/index';

const stripTrailingIndex = (urlString: string) => {
  if (urlString.endsWith(trailingIndex)) {
    return urlString.slice(0, urlString.length - trailingIndex.length);
  }
  return urlString;
};

interface SearchIndexData {
  title: string;
  path: string;
  slug: string;
}

const prepareSearchIndex = async () => {
  const contentIndex = await readIndex();
  const pages = contentIndex.index;
  if (pages.length === 0) {
    throw new Error('Failed to collect data for search index: no pages found');
  }
  const wdSearchData: SearchIndexData[] = pages
    .filter(({ hasContent }) => hasContent)
    .map(({ title, path, slug }) => ({
      title,
      path,
      slug,
    }));
  if (wdSearchData.length === 0) {
    throw new Error('Failed to collect data for search index: no pages with content found');
  }

  console.info(
    'Collected search data for WebDocs articles...',
    `${wdSearchData.length} entries.`
  );

  // Internal docs
  const articles = await fs.readdir(path.resolve(pathToInternalContent));
  const internalDocSearchData: SearchIndexData[] = [];

  const processing = articles.map(async (articleName) => {
    const articlePath = path.resolve(pathToInternalContent, articleName);

    const fileObject = await fs.stat(articlePath);
    const contentPath = fileObject.isDirectory()
      ? `${articlePath}/index.md`
      : articlePath;

    const fileContent = await fs.readFile(contentPath);

    const { content: markdownInput } = matter(fileContent);

    const ast = await changelogProcessor.parse(markdownInput);
    let articleTitle = '';

    visit(
      ast,
      (node: MdNode) => node.type === 'heading' && node.depth === 1,
      (node: MdNode) => {
        articleTitle = node.children
          .filter((child) => child.type === 'text')
          .map((child) => child.value)
          .join(' ');
      }
    );

    const slug = stripTrailingIndex(`docs/${articleName.replace('.md', '')}`);

    internalDocSearchData.push({
      title: articleTitle,
      slug,
      path: `/${slug}`,
    });
  });

  await Promise.all(processing);

  console.info(
    'Collected search data for internal articles...',
    `${internalDocSearchData.length} entries.`
  );

  // Writing into file
  try {
    await fs.access(dataOutputDir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataOutputDir);
    }
  }
  fs.writeFile(
    path.resolve(dataOutputDir, 'search-index.json'),
    JSON.stringify({ data: [...wdSearchData, ...internalDocSearchData] })
  );
};

export default prepareSearchIndex;

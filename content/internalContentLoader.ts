import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { pick } from 'lodash';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrism from 'rehype-prism';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import htmlSlugify from '../utils/sluggerPlugin';

import type { ContentItem } from './wdContentLoader';

export type HtmlNode = Node & {
  tagName?: string;
  properties?: { id?: string; src?: string };
};

const levels = {
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

const trailingIndex = '/index';

const stripTrailingIndex = (urlString: string) => {
  if (urlString.endsWith(trailingIndex)) {
    return urlString.slice(0, urlString.length - trailingIndex.length);
  }
  return urlString;
};

const findHeadings = (ast) => {
  const headings = [];

  visit(
    ast,
    (node: HtmlNode) =>
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName),
    (node) => {
      const heading = {
        depth: levels[node.tagName] || 1,
        value: '',
        anchor: '',
      };
      const children = node.children || [];

      for (let i = 0, l = children.length; i < l; i++) {
        const el = children[i];

        if (el.tagName === 'a') {
          heading.anchor = el.properties.href;
        } else if (el.value) {
          heading.value += el.value;
        }
      }

      headings.push(heading);
    }
  );

  return headings;
};

// TODO: to config
const pathToContent = `docs/`;
const pathToPublic = 'public/';

const changelogProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePrism)
  .use([
    htmlSlugify,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
        linkProperties: {
          'aria-hidden': 'true',
        },
      },
    ],
    [
      rehypeExternalLinks,
      {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      },
    ],
  ])
  .use(rehypeStringify, { allowDangerousHtml: true });

let instanceSingleton;

export default class InternalContentLoader {
  registry = new Map<string, Partial<ContentItem>>();

  async init() {
    // TODO: this is rather messy
    const contentDirectory = path.resolve(pathToContent);
    const articles = await fs.readdir(path.resolve(pathToContent));

    const destinationFolder = path.resolve(pathToPublic, './_assets');

    const processing = articles.map(async (articleName) => {
      const articlePath = path.resolve(contentDirectory, articleName);

      const fileObject = await fs.stat(articlePath);
      const contentPath = fileObject.isDirectory()
        ? `${articlePath}/index.md`
        : articlePath;

      const fileContent = await fs.readFile(contentPath);

      const { data, content: markdownInput } = matter(fileContent);

      const ast = await changelogProcessor.parse(markdownInput);

      const processResult = await changelogProcessor.run(ast);

      visit(
        processResult,
        (node: HtmlNode) => node.tagName === 'img',
        (node: HtmlNode) => {
          const imageSrc = node.properties?.src;
          if (imageSrc) {
            const imageUniqName = `${articleName}/${imageSrc}`
              .replaceAll('/./', '/')
              .replaceAll('/', '-');

            const destinationFile = path.resolve(
              destinationFolder,
              imageUniqName
            );

            node.properties.src = `/${destinationFile
              .split('/public/')
              .at(-1)}`;
          }
        }
      );

      const content = changelogProcessor.stringify(processResult);
      const headings = findHeadings(processResult);
      const mainHeading = headings.find(({ depth }) => depth === 1);
      const title = mainHeading ? mainHeading.value : '';

      const slug = stripTrailingIndex(`docs/${articleName.replace('.md', '')}`);

      this.registry.set(slug, {
        ...data,
        slug,
        path: `/${slug}`,
        headings,
        title,
        content,
      });
    });

    await Promise.all(processing);
  }

  static async getInstance(): Promise<InternalContentLoader> {
    if (!instanceSingleton) {
      instanceSingleton = new InternalContentLoader();
      await instanceSingleton.init();
    }

    return instanceSingleton;
  }

  static async getAll(fields?: string[]): Promise<Partial<ContentItem>[]> {
    const instance = await InternalContentLoader.getInstance();

    if (fields) {
      return Array.from(instance.registry.values()).map((entry) =>
        pick(entry, fields)
      );
    }

    return Array.from(instance.registry.values());
  }

  static async getbySlug(slug): Promise<Partial<ContentItem>> {
    const instance = await InternalContentLoader.getInstance();

    return instance.registry.get(slug);
  }
}

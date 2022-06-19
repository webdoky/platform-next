import { promises as fs } from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';
import matter from 'gray-matter';
import { ContentItem } from './wdContentLoader';
import { visit, Node } from 'unist-util-visit';
import htmlSlugify from '../utils/sluggerPlugin';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { pick } from 'lodash';
import rehypePrism from 'rehype-prism';

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
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: 'icon icon-link',
          },
        },
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
    const imagesDestToSourceMap: { [key: string]: string } = {};

    const processing = articles.map(async (articleName) => {
      const articlePath = path.resolve(contentDirectory, articleName);

      const fileObject = await fs.stat(articlePath);
      const contentPath = fileObject.isDirectory()
        ? `${articlePath}/index.md`
        : articlePath;

      const nameParts = contentPath.split('/');
      const contentFolder = nameParts.slice(0, nameParts.length - 1).join('/');

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
            const imageSource = path.resolve(contentFolder, imageSrc);

            const destinationFile = path.resolve(
              destinationFolder,
              imageUniqName
            );

            imagesDestToSourceMap[destinationFile] = imageSource;

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

    try {
      await fs.access(destinationFolder);
      await fs.rm(destinationFolder, { recursive: true });
    } catch (error) {
      // directory already has been removed
    }

    try {
      // TODO: NextJS seemingly runs page generation in subprocess, which leads to several attempts to
      // access (and remove) this directory. Which, in turn, sometimes crashes build.
      //
      // Need to find a better way of isolating this
      await fs.access(destinationFolder);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(destinationFolder);
      }
    }

    const promisedCopies = Object.entries(imagesDestToSourceMap).map(
      async ([dest, source]) => {
        return await fs.copyFile(source, dest);
      }
    );

    await Promise.all(promisedCopies);
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

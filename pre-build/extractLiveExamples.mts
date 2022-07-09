import { promises as fs } from 'fs';
import sh from './utils/shell.mjs';
import { missingExampleMarkup } from './utils/missingExampleMarkup.mjs';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { Node, visit } from 'unist-util-visit';
import { move } from 'fs-extra';
import _ from 'lodash';
import { readAllPages, PageData } from './utils/readContent.mjs';

const { uniq } = _;

const publicDir = 'public';
const repoWithLiveExamples = `external/interactive-examples`;
const examplesBuildOutputDir = `${repoWithLiveExamples}/docs`;
const docOutputDir = `${publicDir}/interactive-examples`;
const exampleSpecificClassName = 'wd--interactive-example';

export type HtmlNode = Node & {
  type: string;
  tagName?: string;
  properties?: { id?: string; className?: string[]; src?: string };
  value?: string;
  children?: HtmlNode[];
};

const contentProcessor = unified().use(rehypeParse);

const extractLiveExamples = async () => {
  // Cleanup and re-create previously generated folder
  try {
    await fs.access(docOutputDir);
    await fs.rm(docOutputDir, { recursive: true });
  } catch (error) {
    // directory already has been removed
  }

  const fields: (keyof PageData)[] = ['content', 'hasContent', 'slug'];

  const pages = await readAllPages(fields);

  // extracting references from markup
  const preparingSources = pages
    .filter(({ hasContent }) => hasContent)
    .map(async ({ content, slug }) => {
      const htmlAst = await contentProcessor.parse(content);
      const sources = [];

      visit(
        htmlAst,
        (node: HtmlNode) =>
          node.tagName === 'iframe' &&
          node.properties.className.includes(exampleSpecificClassName),
        (node: HtmlNode) => {
          if (node.properties.src) {
            sources.push(node.properties.src);
          } else {
            throw new Error(
              `Missing src in interactive example on the page ${slug}`
            );
          }
        }
      );

      return sources;
    });

  const foundSources = (await Promise.all(preparingSources)).flat();

  console.info(
    'Extracting references to live examples...',
    `${foundSources.length} found.`
  );

  // preparing markup
  try {
    console.info('Building markup with interactive samples...');
    await sh(`cd ${repoWithLiveExamples} && yarn build`);
  } catch (error) {
    throw new Error(`Could not build markup for live examples, ${error}`);
  }

  try {
    console.info('Markup is ready, moving it into public dir...');
    await move(examplesBuildOutputDir, docOutputDir);
  } catch (error) {
    throw new Error(`Could not move built markup with live examples, ${error}`);
  }

  let missingExamples = 0;

  await Promise.all(
    uniq(
      foundSources
        .map((sourcePath) => {
          const pathParts = sourcePath.split('/');
          return pathParts.slice(0, pathParts.length - 1).join('/');
        })
        .map((fileSource) => `${publicDir}${fileSource}`)
    ).map(async (path: string) => {
      try {
        await fs.access(path);
      } catch {
        // making sure all necessary folders exist
        await fs.mkdir(path, { recursive: true });
      }
    })
  );

  const pendingChecks = foundSources.map(async (path) => {
    const filePath = `${publicDir}${path}`;
    try {
      await fs.access(filePath);
    } catch (error) {
      console.warn(`Missing interactive example: ${path}`);
      missingExamples += 1;

      await fs.writeFile(filePath, missingExampleMarkup());
    }
  });

  console.info('Checking live example sources...');

  await Promise.all(pendingChecks);

  console.info('\t', `${missingExamples} missing samples`);
  console.info(
    '\t',
    `${foundSources.length - missingExamples} non-empty samples written.`
  );
};

export default extractLiveExamples;

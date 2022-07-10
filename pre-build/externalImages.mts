import { promises as fs } from 'fs';
import path from 'path';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { HtmlNode } from './extractLiveExamples.mjs';
import { PageData, readAllPages } from './utils/readContent.mjs';

const pathToTranslatedContent = `external/translated-content`;
const targetLocale = 'uk';
const fileInputDir = `files/${targetLocale}`;
const docOutputDir = `public/${targetLocale}/docs`;

const contentProcessor = unified().use(rehypeParse);

interface ImgDesc {
  src: string;
  slug?: string;
}

const refreshExternalImages = async () => {
  const fields: (keyof PageData)[] = ['content', 'hasContent', 'slug'];

  const pages = await readAllPages(fields);

  // extracting references from markup
  const preparingSources = pages
    .filter(({ hasContent }) => hasContent)
    .map(async ({ content, slug, path }) => {
      const htmlAst = await contentProcessor.parse(content);
      const sources: ImgDesc[] = [];

      visit(
        htmlAst,
        (node: HtmlNode) => node.tagName === 'img',
        (node: HtmlNode) => {
          if (node.properties?.src) {
            sources.push({
              src: node.properties.src,
              slug,
            });
          } else {
            throw new Error(`Missing image's src on the page ${slug}`);
          }
        }
      );

      return sources;
    });

  const foundSources = (
    await Promise.all(preparingSources)
  ).flat() as ImgDesc[];

  console.info(
    'Extracting references to illustrations...',
    `${foundSources.length} found.`
  );

  let processedImages = 0;

  // Assuming this function is ran after extractSamples,
  // so the target directory is clean already

  await Promise.all(
    foundSources
      .filter((imgDesc) => {
        if (!imgDesc.slug) {
          console.error('Missing slug on image', imgDesc);
        }
        return imgDesc.slug && imgDesc.src;
      })
      .map(async ({ src, slug = '' }) => {
        const sourcePath = path.resolve(
          pathToTranslatedContent,
          fileInputDir,
          slug.toLowerCase(),
          src
        );
        const targetFolder = path.resolve(docOutputDir, slug);
        const targetFile = path.resolve(targetFolder, src);

        try {
          await fs.access(targetFolder);
        } catch (error) {
          await fs.mkdir(targetFolder, { recursive: true });
        }

        try {
          await fs.access(sourcePath);

          await fs.copyFile(sourcePath, targetFile);
          processedImages += 1;
        } catch (error) {
          console.error(`Missing source image for ${slug} page: ${src}`);
        }
      })
  );

  console.info(`${processedImages} written.`);
};

export default refreshExternalImages;

import { promises as fs } from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';

// TODO: to config
const pathToLocalizedContent = process.env.PATH_TO_LOCALIZED_CONTENT;
const pathToChangelog = `${pathToLocalizedContent}/../CHANGELOG.md`;

const changelogProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify);

let instanceSingleton;

export interface ChangelogItem {
  content?: string;
}

export default class WdChangelogLoader {
  registry = new Set<ChangelogItem>();

  async init() {
    // const contentDirectory = path.join(
    //   process.cwd(),
    //   'node_modules/glossary-content/content'
    // );

    const changelogResolver = async () => {
      const changeLogPath = path.resolve(pathToChangelog);
      const input = await fs.readFile(changeLogPath);

      const ast = await changelogProcessor.parse(input);

      const headingIndex = ast.children.findIndex(
        (node) => node.type === 'heading' && node.depth === 2
      );

      ast.children = ast.children
        .filter(
          (_a, index) => index >= headingIndex && index < headingIndex + 4 // two latest versions
        )
        .map((node) => ({ ...node, depth: 4 }));

      const processResult = await changelogProcessor.run(ast);
      const content = changelogProcessor.stringify(processResult);

      try {
        this.registry.add({
          content,
        });
      } catch (error) {
        console.log('Error in ', error);
      }
    };

    await Promise.all([changelogResolver()]);
  }

  static async getInstance(): Promise<WdChangelogLoader> {
    if (!instanceSingleton) {
      instanceSingleton = new WdChangelogLoader();
      await instanceSingleton.init();
    }

    return instanceSingleton;
  }

  static async getAll(): Promise<ChangelogItem[]> {
    const instance = await WdChangelogLoader.getInstance();

    return Array.from(instance.registry.values());
  }
}

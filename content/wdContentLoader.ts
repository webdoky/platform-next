export interface HeadingItem {
  depth: number;
  value: string;
  anchor: string;
}

export interface MacroData {
  macro: string;
  result: string;
}

export interface ContentItem {
  id: string; // TODO???
  title: string;
  path: string;
  slug: string;
  tags: string; // TODO:??
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
  sourceLastUpdatetAt: number;
  translationLastUpdatedAt: number;
  browser_compat: unknown; // TODO::
  prev?: string;
  next?: string;
}

const headers = { 'Content-Type': 'application/json' };

export default class WdContentLoader {
  // async init() {
  //   global._WdContentLoaderInstanceNeedsInit = false;
  //   let orphanedLinksCount = 0;
  //   let contentExcludedFromSitemap = 0;

  //   // Loading registry with content pages
  //   await registry.init();

  //   for (const page of registry.getPagesData()) {
  //     const {
  //       content,
  //       description,
  //       headings,
  //       data,
  //       path,
  //       section,
  //       references,
  //       updatesInOriginalRepo,
  //       originalPath,
  //     } = page;

  //     // Perform some additional validation on the content before starting generating website structure
  //     const pageUrl = `${path}/`;

  //     // Check if the page is excluded from sitemap
  //     if (content && noindexUrls.includes(pageUrl)) {
  //       contentExcludedFromSitemap++;
  //       console.warn(
  //         '\x1b[33mwarn\x1b[0m',
  //         `- content page is excluded from sitemap: ${path}`
  //       );
  //     } else if (!content && !noindexUrls.includes(pageUrl)) {
  //       console.warn(
  //         '\x1b[33mwarn\x1b[0m',
  //         `- empty content page is included in sitemap: ${pageUrl}`
  //       );
  //     }

  //     // Check if links in the content lead to sensible destinations
  //     const { internalLinkDestinations } = registry;
  //     references.forEach((refItem) => {
  //       if (
  //         !isExternalLink(refItem) &&
  //         !internalLinkDestinations.has(refItem)
  //       ) {
  //         orphanedLinksCount++;
  //         console.warn(
  //           '\x1b[33mwarn\x1b[0m',
  //           `- found orphaned reference: ${refItem} on page ${path}`
  //         );
  //       }
  //     });

  //     this.registry.set(path, {
  //       content,
  //       description,
  //       hasContent: !!content,
  //       headings,
  //       ...data,
  //       path,
  //       originalPath,
  //       updatesInOriginalRepo,
  //       section,
  //       sourceLastUpdatetAt: 0,
  //       translationLastUpdatedAt: 0,
  //     });
  //   }

  //   if (orphanedLinksCount > 0) {
  //     console.warn(
  //       `\x1b[33mfound ${orphanedLinksCount} orphaned reference${
  //         orphanedLinksCount > 1 ? 's' : ''
  //       }\x1b[0m`
  //     );
  //   }
  //   if (contentExcludedFromSitemap > 0) {
  //     console.warn(
  //       `\x1b[33m${contentExcludedFromSitemap} page${
  //         contentExcludedFromSitemap > 1 ? 's' : ''
  //       } excluded from sitemap\x1b[0m`
  //     );
  //   }
  // }

  static async getAll(fields?: string[]): Promise<Partial<ContentItem>[]> {
    // Make sure you have content server running on localhost:3010
    const res = await fetch(
      `http://localhost:3010/getAll?${
        fields ? `fields=${fields.map(encodeURIComponent).join(',')}` : ''
      }`,
      {
        headers,
      }
    );

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  }

  static async getBySlug(slug: string): Promise<ContentItem> {
    const res = await fetch(
      `http://localhost:3010/getBySlug?query=${encodeURIComponent(slug)}`,
      {
        headers,
      }
    );

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  }
}

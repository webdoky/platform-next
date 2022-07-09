const fsStd = require('fs');
const pathStd = require('path');

const { promises: fs } = fsStd;

const targetLocale = process.env.TARGET_LOCALE;
const staticPart = `/${targetLocale}/docs/`;
const contentCachePath = 'cache';
const pageFileName = 'index.json';
const pagesPath = `${contentCachePath}/files`;

const config = {
  siteUrl: process.env.BASE_PATH,
  generateRobotsTxt: false,
  exclude: ['/translation-status-priority', '/translation-status-general'],
  // Default transformation function
  transform: async (config, path) => {
    // TODO connect to page data
    const isWebDokPage = path.indexOf(staticPart) >= 0;

    if (isWebDokPage) {
      const slug = path.replace(staticPart, '');

      const file = await fs.readFile(
        pathStd.resolve(pagesPath, slug, pageFileName),
        'utf-8'
      );
      const pageData = JSON.parse(file);

      const { translationLastUpdatedAt, hasContent } = pageData;

      if (!hasContent) {
        return undefined;
      }

      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        lastmod: translationLastUpdatedAt
          ? new Date(translationLastUpdatedAt).toISOString()
          : undefined,
      };
    }
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    };
  },
  // TODO:??
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page'),
  // ],
};

module.exports = config;

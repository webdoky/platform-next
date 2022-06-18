const noindexUrls = require('./noindex-urls');
const fetch = require('node-fetch');

const targetLocale = process.env.TARGET_LOCALE;
const staticPart = `/${targetLocale}/docs/`;
const headers = { 'Content-Type': 'application/json' };

const config = {
  siteUrl: process.env.BASE_PATH,
  generateRobotsTxt: false,
  exclude: noindexUrls,
  // Default transformation function
  transform: async (config, path) => {
    // TODO connect to page data
    const isWebDokPage = path.indexOf(staticPart) >= 0;

    if (isWebDokPage) {
      const slug = path.replace(staticPart, '');

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
      const { translationLastUpdatedAt } = json.data;

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

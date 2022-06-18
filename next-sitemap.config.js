const noindexUrls = require('./noindex-urls');

const config = {
  siteUrl: process.env.BASE_PATH,
  changefreq: 'weekly',
  generateRobotsTxt: false,
  exclude: noindexUrls,
  // Default transformation function
  transform: async (config, path) => {
    // TODO connect to page data
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // TODO:??
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page'),
  // ],
};

export default config;

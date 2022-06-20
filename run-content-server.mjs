import runServer from '@webdoky/content-server/src/main';

runServer({
  pathToLocalizedContent: `content/external/translated-content/files`,
  pathToOriginalContent: `content/external/original-content/files`,
  sourceLocale: process.env.SOURCE_LOCALE,
  targetLocale: process.env.TARGET_LOCALE,
});

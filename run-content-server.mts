import runServer from '@webdoky/content-server/build/src/main.js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

runServer({
  pathToLocalizedContent: `external/translated-content/files`,
  pathToOriginalContent: `external/original-content/files`,
  sourceLocale: process.env.SOURCE_LOCALE,
  targetLocale: process.env.TARGET_LOCALE,
});

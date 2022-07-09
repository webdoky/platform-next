import * as dotenv from 'dotenv';

import { Runner } from '@webdoky/content-processor/dist/main.js';

dotenv.config({ path: '.env.local' });

const processContent = async () => {
  const runner = new Runner({
    pathToLocalizedContent: `external/translated-content/files`,
    pathToOriginalContent: `external/original-content/files`,
    pathToCache: `cache/`,
    sourceLocale: process.env.SOURCE_LOCALE,
    targetLocale: process.env.TARGET_LOCALE,
  });

  await runner.init();

  console.log('Finished processing files');
};

export default processContent;

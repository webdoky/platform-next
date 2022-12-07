import * as dotenv from 'dotenv';

import { Runner } from '@webdoky/content-processor/dist/main.js';

dotenv.config({ path: '.env.local' });

const processContent = async () => {
  const runner = new Runner({
    pathToLocalizedContent: process.env.PATH_TO_LOCALIZED_CONTENT,
    pathToOriginalContent: process.env.PATH_TO_ORIGINAL_CONTENT,
    pathToCache: 'cache',
    sourceLocale: process.env.SOURCE_LOCALE,
    targetLocale: process.env.TARGET_LOCALE,
  });

  await runner.init();

  console.log('Finished processing files');
};

export default processContent;

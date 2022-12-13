import * as dotenv from 'dotenv';

import { Runner } from '@webdoky/content-processor/dist/main.js';
import { readRedirects } from './utils/readContent.mjs';

dotenv.config({ path: '.env.local' });

const processContent = async () => {
  const pathToLocalizedContent = `external/translated-content/files`;
  const targetLocale = process.env.TARGET_LOCALE;
  let redirectMap = {};

  try {
    redirectMap = await readRedirects(
      `${pathToLocalizedContent}/${targetLocale}`
    );
  } catch (error) {
    console.warn(error, "Failed to read redirects map, assuming it's empty...");
  }

  const runner = new Runner({
    pathToLocalizedContent,
    pathToOriginalContent: `external/original-content/files`,
    pathToCache: `cache/`,
    sourceLocale: process.env.SOURCE_LOCALE,
    targetLocale,
    redirectMap,
  });

  await runner.init();

  console.log('Finished processing files');
};

export default processContent;

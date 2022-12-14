import * as dotenv from 'dotenv';

import { Runner } from '@webdoky/content-processor/dist/main.js';
import { readRedirects } from './utils/readContent.mjs';

dotenv.config({ path: '.env.local' });

const processContent = async () => {
  const pathToLocalizedContent = process.env.PATH_TO_LOCALIZED_CONTENT;
  const pathToOriginalContent = process.env.PATH_TO_ORIGINAL_CONTENT;
  const targetLocale = process.env.TARGET_LOCALE;
  const sourceLocale = process.env.SOURCE_LOCALE;
  let redirectMap = {};

  try {
    redirectMap = await readRedirects(
      `${pathToOriginalContent}/${sourceLocale?.toLowerCase()}`
    );
    console.log('got redirects map', redirectMap);
  } catch (error) {
    console.warn(error, "Failed to read redirects map, assuming it's empty...");
  }

  const runner = new Runner({
    pathToLocalizedContent,
    pathToOriginalContent,
    pathToCache: `cache/`,
    sourceLocale,
    targetLocale,
    redirectMap,
  });

  await runner.init();

  console.log('Finished processing files');
};

export default processContent;

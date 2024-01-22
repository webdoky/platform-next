import * as dotenv from 'dotenv';
import fg from 'fast-glob';

import extractTextFromHtml from './extractTextFromHtml.mjs';
import getAlgoliaIndex from './getAlgoliaIndex.mjs';
import hash from './hash.mjs';
import { getHash, initHashes, saveHash } from './hashes.mjs';
import extractPrebuildResultItem from './extractPrebuildResultItem.mjs';
import saveResultItemToAlgolia from './saveResultItemToAlgolia.mjs';
import { writeFile } from 'fs/promises';

dotenv.config({ path: '.env.local' });
const index = getAlgoliaIndex();

async function run() {
  try {
    await initHashes();
    // Find all index.json files in cache/files,
    // including subdirectories
    const filesStream = fg.stream('cache/files/**/index.json');
    let filesProcessed = 0;
    for await (const filePath of filesStream) {
      //   console.log(filePath);
      const resultItem = await extractPrebuildResultItem(filePath.toString());
      if (!resultItem.hasContent) {
        continue;
      }
      console.log(resultItem.slug);
      const text = extractTextFromHtml(resultItem.content);
      const slug = filePath
        .toString()
        .slice('cache/files/'.length, filePath.lastIndexOf('/index.json'));

      const oldHash = getHash(slug);
      const newHash = hash(text);
      if (oldHash === newHash) {
        filesProcessed++;
        continue;
      }
      console.log(`Saving to Algolia: ${slug}`);
      if (process.env.NODE_ENV !== 'production') {
        await writeFile('debug.txt', text, 'utf8');
      }
      await saveResultItemToAlgolia(resultItem, text, index);
      await saveHash(slug, newHash);
      filesProcessed++;
    }
    if (filesProcessed === 0) {
      throw new Error('No files were processed');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();

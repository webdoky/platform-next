import type { Algoliasearch } from 'algoliasearch';

import getStringByteSize from './getStringByteSize.mjs';
import type { PrebuildResultItem } from './transformPrebuildResultItem.mjs';

const CHUNK_SIZE = 5000;
export default async function saveResultItemToAlgolia(
  resultItem: PrebuildResultItem,
  text: string,
  client: Algoliasearch
): Promise<void> {
  const contentChunks: string[] = [];
  let nextChunk = '';
  for (const contentSentence of text.split(/\. /)) {
    const maybeChunk = nextChunk + '. ' + contentSentence;
    if (getStringByteSize(maybeChunk) > CHUNK_SIZE) {
      contentChunks.push(nextChunk + '.');
      nextChunk = contentSentence;
    } else {
      nextChunk = maybeChunk;
    }
  }
  if (nextChunk) {
    contentChunks.push(nextChunk + '.');
  }
  await client.saveObjects({
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
    objects: contentChunks.map((content, i) => ({
      objectID: `${resultItem.slug}-${i}`,
      ...resultItem,
      content,
    })),
  });
}

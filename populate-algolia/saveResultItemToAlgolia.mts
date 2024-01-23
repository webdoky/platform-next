import type { SearchIndex } from 'algoliasearch';
import type { PrebuildResultItem } from './transformPrebuildResultItem.mjs';
import getStringByteSize from './getStringByteSize.mjs';

const CHUNK_SIZE = 1000;
export default async function saveResultItemToAlgolia(
  resultItem: PrebuildResultItem,
  text: string,
  index: SearchIndex
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
  await index.saveObjects(
    contentChunks.map((content, i) => ({
      objectID: `${resultItem.slug}-${i}`,
      ...resultItem,
      content,
    }))
  );
}

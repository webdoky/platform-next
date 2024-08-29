import { readFile } from 'fs/promises';

import transformPrebuildResultItem, {
  type PrebuildResultItem,
} from './transformPrebuildResultItem.mjs';

export default async function extractPrebuildResultItem(
  filePath: string
): Promise<PrebuildResultItem> {
  const jsonData = await readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return transformPrebuildResultItem(data);
}

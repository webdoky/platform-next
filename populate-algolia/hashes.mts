import { readFile, writeFile } from 'fs/promises';
let hashes: { [key: string]: string } = {};

export function getHash(slug: string): string | undefined {
  return hashes[slug];
}

export async function saveHash(slug: string, hashValue: string): Promise<void> {
  hashes[slug] = hashValue;
  const json = JSON.stringify(hashes, null, 2);
  await writeFile('hashes.json', json, 'utf8');
}

export async function initHashes() {
  try {
    const jsonData = await readFile('hashes.json');
    hashes = JSON.parse(jsonData.toString());
  } catch (err) {
    if (err.code === 'ENOENT') {
      hashes = {};
    } else {
      throw err;
    }
  }
}

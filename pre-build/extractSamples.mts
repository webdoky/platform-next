import { promises as fs } from 'fs';
import path from 'path';
import { fetchAllSamples } from './utils/fetchContent.mjs';
import { liveSampleMarkup, missingSampleMarkup } from './utils/liveSampleMarkup.mjs';

const targetLocale = 'uk';
const publicDir = 'public';
const docOutputDir = `${publicDir}/${targetLocale}/docs`;

interface ExtractedSample {
  src: string;
  id: string;
  content: {
    html?: string;
    css?: string;
    js?: string;
  };
}

const extractEmbeddedSamples = async () => {
  // Cleanup and re-create previously generated folder
  try {
    await fs.access(docOutputDir);
    await fs.rm(docOutputDir, { recursive: true });
  } catch (error) {
    // directory already has been removed
  }

  const samples = await fetchAllSamples();
  let writtenFiles = 0;
  let missingSamples = 0;

  const writingSamples = samples.map(async (sample: ExtractedSample) => {
    const { src, content, id } = sample;

    let srcParts = src.split('/');
    srcParts = srcParts.slice(srcParts[0] === '' ? 1 : 0, srcParts.length - 1);

    const folderName = `${publicDir}/${srcParts.join('/')}`;

    try {
      await fs.access(folderName);
      console.log(`${folderName} accessed`);
    } catch (error) {
      await fs.mkdir(folderName, { recursive: true });
    }

    if (!Object.values(content).length) {
      console.warn(`Missing sample content for ${id}, source: ${src}`);
      await fs.writeFile(`${publicDir}/${src}`, missingSampleMarkup());
      missingSamples += 1;
      return;
    } else {
      await fs.writeFile(`${publicDir}/${src}`, liveSampleMarkup(content));
      writtenFiles += 1;
    }
  });

  console.info('Writing live sample sources...');

  await Promise.all(writingSamples);

  console.info('\t', `${missingSamples} missing samples`);
  console.info('\t', `${writtenFiles} non-empty samples written.`);
};

export default extractEmbeddedSamples;

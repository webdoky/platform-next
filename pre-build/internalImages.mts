import { promises as fs } from 'fs';
import path from 'path';

const pathToInternalContent = `docs/`;
const imageOutputDir = 'public/_assets';

const refreshInternalImages = async () => {
  
  const articles = await fs.readdir(path.resolve(pathToInternalContent));
  let processedFiles = 0;

  // Cleanup and re-create previously generated folder
  try {
    await fs.access(imageOutputDir);
    await fs.rm(imageOutputDir, { recursive: true });
    await fs.mkdir(imageOutputDir);
  } catch (error) {
    // directory already has been removed
    await fs.mkdir(imageOutputDir);
  }

  const processing = articles.map(async (articleName) => {
    const articlePath = path.resolve(pathToInternalContent, articleName);

    const fileObject = await fs.stat(articlePath);

    if (fileObject.isDirectory()) {
      // images only work in article folders

      const files = (await fs.readdir(path.resolve(pathToInternalContent, articleName)))
      .filter(
        filename => (
          filename.endsWith('.png') 
          || filename.endsWith('.jpg') 
          || filename.endsWith('.gif') 
          || filename.endsWith('.jpeg')
        )
      );

      const promisedCopies = files.map(
        async (filename) => {
          await fs.copyFile(path.resolve(pathToInternalContent, articleName, filename), path.resolve(imageOutputDir, `${articleName}-${filename}`));
          processedFiles += 1;
        }
      );

      await Promise.all(promisedCopies)
    }
  });

  await Promise.all(processing);

  console.info('Writing image files...', `${processedFiles} written.`)
};

export default refreshInternalImages;

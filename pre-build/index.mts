import extractLiveExamples from './extractLiveExamples.mjs';
import extractEmbeddedSamples from './extractSamples.mjs';
import refreshInternalImages from './internalImages.mjs';
import processContent from './processContent.mjs';
import refreshExternalImages from './externalImages.mjs';

(async function () {
  try {
    await processContent();
    await refreshInternalImages();
    await extractEmbeddedSamples();
    await refreshExternalImages();
    await extractLiveExamples();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

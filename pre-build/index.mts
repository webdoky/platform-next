import extractLiveExamples from './extractLiveExamples.mjs';
import extractEmbeddedSamples from './extractSamples.mjs';
import refreshInternalImages from './internalImages.mjs';
import prepareSearchIndex from './searchIndex.mjs';
import processContent from './processContent.mjs';
import refreshExternalImages from './externalImages.mjs';

(async function () {
  await processContent();
  await prepareSearchIndex();
  await refreshInternalImages();
  await extractEmbeddedSamples();
  await refreshExternalImages();
  await extractLiveExamples();
})();

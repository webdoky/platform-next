import extractLiveExamples from './extractLiveExamples.mjs';
import extractEmbeddedSamples from './extractSamples.mjs';
import refreshInternalImages from './internalImages.mjs';
import prepareSearchIndex from './searchIndex.mjs';

prepareSearchIndex();
refreshInternalImages();
extractEmbeddedSamples();
extractLiveExamples();

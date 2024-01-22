import algoliasearch from 'algoliasearch';

export default function getAlgoliaIndex() {
  const { ALGOLIA_ADMIN_KEY, NEXT_ALGOLIA_APP_ID, NEXT_ALGOLIA_INDEX } =
    process.env;
  if (!ALGOLIA_ADMIN_KEY || !NEXT_ALGOLIA_APP_ID || !NEXT_ALGOLIA_INDEX) {
    throw new Error('Algolia credentials are missing');
  }
  const client = algoliasearch(NEXT_ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
  return client.initIndex(NEXT_ALGOLIA_INDEX);
}

import algoliasearch from 'algoliasearch/lite';

export function getAlgoliaClient() {
  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ||
    !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  ) {
    throw new Error('Algolia credentials are missing');
  }

  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );
}

export function getAlgoliaIndexName() {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_INDEX) {
    throw new Error('Algolia credentials are missing');
  }
  return process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
}
